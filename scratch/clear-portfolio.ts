import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Cleaning up mock portfolio items...")
  const result = await prisma.portfolioItem.deleteMany()
  console.log(`Successfully deleted ${result.count} mock portfolio items from the database!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
