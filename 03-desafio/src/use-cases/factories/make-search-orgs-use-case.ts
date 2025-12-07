import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { SearchOrgsUseCase } from "../search-orgs";

export function makeSearchOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new SearchOrgsUseCase(orgsRepository);

  return useCase
}