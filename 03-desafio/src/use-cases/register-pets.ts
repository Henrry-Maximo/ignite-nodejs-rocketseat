import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetWithoutAssociateWithOrg } from "./errors/pet-without-associate-with-org";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrganizationNotExists } from "./errors/organization-not-exists";

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
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const orgId = await prismaOrgsRepository.findById(org);

    if (!orgId) {
      throw new OrganizationNotExists
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
