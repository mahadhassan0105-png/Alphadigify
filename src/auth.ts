import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null

        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (passwordsMatch) return { id: user.id, email: user.email, name: user.name, role: user.role, image: (user as any).image || "" }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.picture = user.image || ""
      }
      if (token.sub && !token.id) {
        token.id = token.sub
      }
      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name
        if (session.image !== undefined) token.picture = session.image
      }
      return token
    },
    session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = (token.id as string) || (token.sub as string) || ""
        session.user.image = (token.picture as string) || ""
      }
      return session
    }
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
})
