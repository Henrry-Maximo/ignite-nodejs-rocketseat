import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { PetsRepository } from '@/repositories/pets-repository';
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { OrgnizationNotHavePhoneError } from './errors/organization-not-have-phone-error';

interface GetPetContactUseCaseRequest {
  id: string;
}

interface GetPetContactUseCaseResponse {
  whatsappUrl: string;
}

export class GetPetContactUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({
    id,
  }: GetPetContactUseCaseRequest): Promise<GetPetContactUseCaseResponse> {
  const pet = await this.petsRepository.findById(id);
  
  if (!pet) {
    throw new ResourceNotFoundError();
  }

  const prismaOrgsRepository = new PrismaOrgsRepository();
  const orgId = await prismaOrgsRepository.findById(pet.org_id);

  if (!orgId) {
    throw new OrgnizationNotHavePhoneError();
  }
  
  const message = `Olá! Tenho interesse em adotar o ${pet.name}. Podemos conversar?`
  const whatsappUrl = `https://wa.me/${orgId.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
  
  return { whatsappUrl }
  }
}
