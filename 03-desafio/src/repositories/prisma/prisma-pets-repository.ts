import { Prisma, Pet } from '@prisma/client';
import { PetsRepository } from '../pets-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements PetsRepository {
  async searchMany(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          address: {
            equals: city
          }
        }
      }
    });

    return pets
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
}
