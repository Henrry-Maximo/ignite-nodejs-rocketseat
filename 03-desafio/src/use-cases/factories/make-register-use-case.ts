import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../register";

/*
  * Centralizador de criação do caso de uso
*/
export function makeRegisterUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const registerUseCase = new RegisterUseCase(prismaOrgsRepository);

  return registerUseCase;
}
