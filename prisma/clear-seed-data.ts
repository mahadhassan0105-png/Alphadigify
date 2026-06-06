import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Cleaning up seed data...")

  // Delete all records except users
  await prisma.testimonial.deleteMany()
  await prisma.caseStudy.deleteMany()
  await prisma.portfolioItem.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.project.deleteMany()
  await prisma.client.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.teamMember.deleteMany()

  console.log("Seed data removed successfully! Database is now empty (except for Admin user).")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
