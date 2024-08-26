import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckUseCaseRequest): Promise<CheckUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
