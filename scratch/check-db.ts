import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    console.log("DATABASE_URL env:", process.env.DATABASE_URL)
    const result = await prisma.$queryRawUnsafe('SELECT version()')
    console.log("DATABASE VERSION INFO:", JSON.stringify(result, null, 2))
  } catch (e) {
    console.error("Failed to run version query:", e)
  }
}

main().finally(() => prisma.$disconnect())
