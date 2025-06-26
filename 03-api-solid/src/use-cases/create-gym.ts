import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

// undefined: não fará nada vs null: limpar valor existente vs value: atualizar
// valor existente

interface CreateGymUseCaseRequest {
  title: string;
  description?: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
