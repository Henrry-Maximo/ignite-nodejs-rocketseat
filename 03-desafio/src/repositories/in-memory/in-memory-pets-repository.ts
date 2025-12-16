import { Pet, Prisma } from '@prisma/client';
import { FindManyPetsParams, PetsRepository } from '../pets-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      status: data.status!,
      description: data.description,
      age: data.age!,
      size: data.size!,
      power: data.power!,
      independence: data.independence!,
      ambience: data.ambience!,
      path: data.path!,
      requisites: data.requisites as string[],
      org_id: data.org! as string,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  searchMany(params: FindManyPetsParams): Promise<Pet[]> {
    throw new Error('Method not implemented.');
  }
  
  findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
