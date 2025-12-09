import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";

export function makeSearchPetsUseCase() {
  const petRepository = new PrismaPetsRepository();
  const petsUseCase = new SearchPetsUseCase(petRepository);

  return petsUseCase
}