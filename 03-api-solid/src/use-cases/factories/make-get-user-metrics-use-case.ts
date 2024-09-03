import { GetUserMetricsUseCaseUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository";

export function makeGetMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCaseUseCase(checkInsRepository);

  return useCase;
}
