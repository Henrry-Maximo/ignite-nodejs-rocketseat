import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { GetOrgProfileUseCase } from '../get-user-profile';

export function makeGetOrgProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const profileUseCase = new GetOrgProfileUseCase(prismaOrgsRepository);

  return profileUseCase;
}
