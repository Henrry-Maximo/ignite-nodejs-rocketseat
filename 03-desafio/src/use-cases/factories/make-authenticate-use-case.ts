import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { AuthenticateUseCase } from '../authenticate';

/*
 * Centralizador de criação do caso de uso
 */
export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository);

  return authenticateUseCase;
}
