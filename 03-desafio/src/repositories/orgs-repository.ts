import { Org, Prisma } from '@prisma/client';

/*
 * interface ou classe abstrata
 */
export interface OrgsRepository {
  findById(id: string): Promise<Org | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
