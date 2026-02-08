// console.log('Hello! Will starting before of tests');
import 'dotenv/config'

import { PrismaClient } from '@prisma/client/extension'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('Please provider a DATABASE_URL environment variable.')

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  console.log('antes')

  const databaseUrl = generateUniqueDatabaseURL(schemaId)

  // sobrescrever o valor (alterando o banco)
  process.env.DATABASE_URL = databaseUrl

  console.log(databaseUrl)
  execSync('pnpm prisma migrate deploy')
})
afterAll(async () => {
  console.log('depois')

  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
