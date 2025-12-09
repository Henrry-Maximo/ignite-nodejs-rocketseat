import { Prisma, Pet } from '@prisma/client';
import { PetsRepository } from '../pets-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements PetsRepository {
  async searchMany(name?: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          equals: name
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
