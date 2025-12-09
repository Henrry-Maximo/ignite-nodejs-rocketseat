import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseRequest {
  name?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({ name }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.searchMany(name);

    if (!pets) {
      throw new SearchPetsNonError();
    }

    return { pets }
  }
}