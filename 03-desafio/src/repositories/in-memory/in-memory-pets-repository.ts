import { Pet, Prisma } from '@prisma/client';
import { FindManyPetsParams, PetsRepository } from '../pets-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
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
      org_id: (data.org as any)?.connect?.id || data.org,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) return null;

    return pet;
  }

  delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id)
    return Promise.resolve()
  }

  async searchMany(params: FindManyPetsParams): Promise<Pet[]> {
    const pets = this.items.filter((item) => item.name.includes(params.name ?? ''));

    return pets;
  }
}
