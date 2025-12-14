import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetContactUseCase } from "../get-pet-contact";

export function makeContactOrgsPetsUseCase() {
  const petRepository = new PrismaPetsRepository();
  const petsUseCase = new GetPetContactUseCase(petRepository);

  return petsUseCase
}