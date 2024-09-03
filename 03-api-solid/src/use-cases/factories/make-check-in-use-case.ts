import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository";

export function makeGetMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
