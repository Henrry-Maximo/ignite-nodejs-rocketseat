import { Pet, Prisma, Age, Size, Status, Power, Independence, Ambience } from '@prisma/client';

export interface FindManyPetsParams {
  id?: string;
  city: string;
  status?: Status;
  age?: Age;
  size?: Size;
  power?: Power;
  independence?: Independence;
  ambience?: Ambience;
}


export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>;
  searchMany(params: FindManyPetsParams): Promise<Pet[]>
}
