import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { OrganizationNotExists } from "./errors/organization-not-exists";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface RegisterPetsUseCaseRequest {
  name: string;
  description: string;
  status: "available" | "adopted" | "reserved" | "unavailable";
  age: "puppy" | "young" | "adult";
  size: "small" | "medium" | "large";
  power: "low" | "moderate" | "high";
  independence: "low" | "medium" | "high";
  ambience: "small" | "medium" | "large";
  path: string;
  requisites: string[];
  org: string;
}

interface RegisterPetsUseCaseResponse {
  pet: Pet;
}

export class RegisterPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {
    this.petsRepository = petsRepository;
    this.orgsRepository = orgsRepository;
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
    const orgId = await this.orgsRepository.findById(org);

    if (!orgId) {
      throw new OrganizationNotExists();
    }

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
