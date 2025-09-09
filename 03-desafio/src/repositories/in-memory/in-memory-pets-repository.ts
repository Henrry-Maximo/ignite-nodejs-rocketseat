import { Pet, Prisma } from '@prisma/client';
import { PetsRepository } from '../pets-repository';
import { ServerInternalError } from '@/use-cases/errors/server-internal-error';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const org = {
      id: 'org-1',
      name: 'Cãopanheiro',
      email: 'caopanheiro@example.com',
      password_hash: '123456',
      whatsapp: '11999999999',
      cep: '12345-678',
      address: 'Rua dos Cães',
      created_at: new Date(),
    };

    const pet = {
      id: 'pet-1',
      name: data.name,
      status: data.status,
      description: data.description,
      age: data.age,
      size: data.size,
      power: data.power,
      independence: data.independence,
      ambience: data.ambience,
      requisites: data.requisites,
      org_id: org.id,
      created_at: new Date(),
    };

    if (!pet) {
      throw new ServerInternalError();
    }

    this.items.push(pet);
  }
}
