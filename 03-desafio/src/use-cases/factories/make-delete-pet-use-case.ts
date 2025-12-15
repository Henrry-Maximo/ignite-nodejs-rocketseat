import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { DeletePetUseCase } from "../delete-pet";

export function makeDeletePetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const deleteUseCase = new DeletePetUseCase(prismaPetsRepository);

  return deleteUseCase;
}
