import { Pet, Prisma } from '@prisma/client';
import { FindManyPetsParams, PetsRepository } from '../pets-repository';
import { ServerInternalError } from '@/use-cases/errors/server-internal-error';
import { randomUUID } from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
  searchMany(params: FindManyPetsParams): Promise<Pet[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public items: Pet[] = [];

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const org = {
      id: String(randomUUID),
      name: 'Cãopanheiro',
      email: 'caopanheiro@example.com',
      password_hash: '123456',
      whatsapp: '11999999999',
      cep: '12345-678',
      address: 'Rua dos Cães',
      created_at: new Date(),
    };

    const pet = {
      id: String(randomUUID),
      name: data.name,
      status: data.status,
      description: data.description,
      age: data.age,
      size: data.size,
      power: data.power,
      independence: data.independence,
      ambience: data.ambience,
      path: data.path,
      requisites: data.requisites,
      org_id: org.id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
