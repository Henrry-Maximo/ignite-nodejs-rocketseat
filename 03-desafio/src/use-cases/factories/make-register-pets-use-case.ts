import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { RegisterPetsUseCase } from "../register-pets";

export function makeRegisterPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const registerPetUseCase = new RegisterPetsUseCase(prismaPetsRepository);

  return registerPetUseCase;
}

