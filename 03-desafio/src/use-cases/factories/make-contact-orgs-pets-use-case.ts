import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetContactUseCase } from "../get-pet-contact";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeContactOrgsPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const petsUseCase = new GetPetContactUseCase(petsRepository, orgsRepository);

  return petsUseCase;
}
