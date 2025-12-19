import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetsUseCase } from "../register-pets";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeRegisterPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const registerPetUseCase = new RegisterPetsUseCase(
    prismaPetsRepository,
    prismaOrgsRepository
  );

  return registerPetUseCase;
}
