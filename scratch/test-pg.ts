/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'

const passwords = ['Mahad@6225425', 'postgres', 'admin', '1234', '123456', '']

async function testPG() {
  for (const pw of passwords) {
    const connStr = `postgresql://postgres:${encodeURIComponent(pw)}@localhost:5432/postgres`
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connStr
        }
      }
    })
    try {
      // Run a simple raw query
      await prisma.$queryRawUnsafe('SELECT 1')
      console.log(`\nSUCCESSFULLY CONNECTED TO POSTGRESQL!`)
      console.log(`Matching password is: "${pw}"`)
      await prisma.$disconnect()
      return
    } catch (e: any) {
      console.log(`Failed with password "${pw}": ${e.message}`)
      await prisma.$disconnect()
    }
  }
  console.log("\nCould not connect with standard passwords. The user will need to supply their password.")
}

testPG()
