import { PetsRepository } from "@/repositories/pets-repository";
import { Pet, Age, Size, Status, Power, Independence, Ambience } from "@prisma/client";

interface SearchPetsUseCaseRequest {
  city: string;
  status?: Status;
  age?: Age;
  size?: Size;
  power?: Power;
  independence?: Independence;
  ambience?: Ambience;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute(data: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.searchMany({
      city: data.city,
      status: data.status,
      age: data.age,
      size: data.size,
      power: data.power,
      independence: data.independence,
      ambience: data.ambience
    });

    return { pets }
  }
}