import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { SearchPetsNonError } from "./errors/search-pets-non-error";

interface SearchPetsUseCaseRequest {
  city: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({ city }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.searchMany(city);

    if (!pets.length) {
      throw new SearchPetsNonError();
    }

    return { pets }
  }
}