import { PrismaClient } from '@prisma/client';
import { env } from '../env';

// Arquivo de configuração para usar o banco de dados
// Log: mostrar todas as querys no console
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});
