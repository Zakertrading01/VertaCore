import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient({ datasourceUrl: 'postgresql://postgres:postgres@localhost:5432/vertacore?schema=public' })

async function main() {
  const users = await db.adminUser.findMany()
  console.log('Existing users:', users)

  await db.adminUser.deleteMany()
  console.log('Deleted existing admin users.')
  
  const passwordHash = await bcrypt.hash('Admin@123', 10)
  await db.adminUser.create({
    data: {
      email: 'admin@aerixtech.com',
      name: 'Admin',
      passwordHash,
    },
  })
  console.log('Created admin@aerixtech.com with new password!')
}

main().catch(console.error).finally(() => db.$disconnect())
