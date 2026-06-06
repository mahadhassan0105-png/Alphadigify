import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const users = await prisma.user.findMany()
    console.log("SUCCESS! Found users:", users.length)
  } catch (e) {
    console.error("FAILED TO CONNECT:")
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
