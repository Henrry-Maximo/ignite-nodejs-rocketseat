import { prisma } from '@/lib/prisma';
import 'dotenv/config'
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto'

import type { Environment } from 'vitest/environments'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL env variable')
  }

  // Converte a string da URL em objeto para manipular o schema do banco
  const url = new URL(process.env.DATABASE_URL);

  // Usa o método "searchParams" para alterar o valor da chave schema na URL
  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr", // teste serão executados pelo servidor
  async setup() {
    // 1 - Criar banco de testes
    const schema = randomUUID();
    const databaseUrl = generateDatabaseUrl(schema);

    // Atualiza a url na variável de ambiente
    process.env.DATABASE_URL = databaseUrl;

    // executa todas as migrações - realiza criação das tabelas
    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        // 2 Apgar o banco de testes
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

        await prisma.$disconnect();
      }
    }

  }
}