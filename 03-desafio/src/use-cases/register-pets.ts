import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetWithoutAssociateWithOrg } from "./errors/pet-without-associate-with-org";

interface RegisterPetsUseCaseRequest {
  name: string;
  description: string;
  status: "AVAILABLE" | "ADOPTED" | "RESERVED" | "UNAVAILABLE";
  age: "PUPPY" | "YOUNG" | "ADULT" | "SENIOR";
  size: "SMALL" | "MEDIUM" | "LARGE";
  power: "LOW" | "MODERATE" | "HIGH";
  independence: "LOW" | "MEDIUM" | "HIGH";
  ambience: "SMALL_SPACE" | "MEDIUM_SPACE" | "LARGE_SPACE";
  path: string;
  requisites: string[];
  org: string;
}

interface RegisterPetsUseCaseResponse {
  pet: Pet;
}

export class RegisterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({
    name,
    age,
    ambience,
    description,
    independence,
    org,
    path,
    power,
    requisites,
    size,
    status,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {
    if (!org) throw new PetWithoutAssociateWithOrg();

    const pet = await this.petsRepository.create({
      name,
      age,
      ambience,
      description,
      independence,
      path,
      power,
      requisites,
      size,
      status,
      org: {
        connect: {
          id: org,
        },
      },
    });

    return {
      pet,
    };
  }
}
