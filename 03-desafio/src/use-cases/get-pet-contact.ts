import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { PetsRepository } from "@/repositories/pets-repository";
import { OrgnizationNotHavePhoneError } from "./errors/organization-not-have-phone-error";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface GetPetContactUseCaseRequest {
  id: string;
}

interface GetPetContactUseCaseResponse {
  whatsappUrl: string;
}

export class GetPetContactUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {
    this.petsRepository = petsRepository;
    this.orgsRepository = orgsRepository;
  }

  async execute({
    id,
  }: GetPetContactUseCaseRequest): Promise<GetPetContactUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const orgId = await this.orgsRepository.findById(pet.org_id);

    if (!orgId) {
      throw new ResourceNotFoundError();
    }

    if (!orgId.phone) {
      throw new OrgnizationNotHavePhoneError();
    }

    const message = `Olá! Tenho interesse em adotar o ${pet.name}. Podemos conversar?`;
    const whatsappUrl = `https://wa.me/${orgId.phone.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;

    return { whatsappUrl };
  }
}
