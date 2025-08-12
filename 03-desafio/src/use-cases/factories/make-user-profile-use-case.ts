import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeUserProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const profileUseCase = new GetUserProfileUseCase(prismaOrgsRepository);

  return profileUseCase;
}
