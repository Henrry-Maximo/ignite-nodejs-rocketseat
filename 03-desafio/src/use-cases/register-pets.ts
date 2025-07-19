
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetWithoutAssociateWithOrg } from "./errors/pet-without-associate-with-org";

interface RegisterPetsUseCaseRequest {
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

interface RegisterPetsUseCaseResponse {
  pet: Pet;
};

export class RegisterPetsUseCase {
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
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {

    if (!org) throw new PetWithoutAssociateWithOrg();

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
      org: {
        connect: {
          id: org, // aqui org é o string com o id
        },
      },
    });

    return {
      pet,
    };
  }
}
