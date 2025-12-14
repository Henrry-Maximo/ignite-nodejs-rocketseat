import { Prisma, Pet } from '@prisma/client';
import { FindManyPetsParams, PetsRepository } from '../pets-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async searchMany(data: FindManyPetsParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        id: data.id,
        org: {
          address: {
            equals: data.city
          }
        },
        status: data.status,
        age: data.age,
        size: data.size,
        power: data.power,
        independence: data.independence,
        ambience: data.ambience
      }
    });

    return pets
  }
}
