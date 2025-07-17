import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  status: "DISPONÍVEL" | "INDISPONÍVEL";
  description: string;
  age: "FILHOTE" | "ADULTO" | "IDOSO";
  size: "PEQUENINO" | "MEDIANO" | "GRANDINHO";
  power: "BAIXA" | "MEDIA" | "ALTA";
  independence: "BAIXA" | "MEDIA" | "ALTA";
  ambience: "PEQUENO" | "AMPLO";
  requisites: string[];
  org: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
};

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  };

  async execute({
    name,
    status,
    description,
    age,
    size,
    power,
    independence,
    ambience,
    requisites,
    org,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    if (!org) return null;

    const pet = await this.petsRepository.create({
      name,
      status,
      description,
      age,
      size,
      power,
      independence,
      ambience,
      requisites,
      org,
    });

    return {
      pet,
    };
  }
}
