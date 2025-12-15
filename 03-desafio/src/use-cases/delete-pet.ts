import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeletePetsUseCaseRequest {
  id: string;
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({ id }: DeletePetsUseCaseRequest): Promise<void> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }
    
    await this.petsRepository.delete(id);
  }
}
