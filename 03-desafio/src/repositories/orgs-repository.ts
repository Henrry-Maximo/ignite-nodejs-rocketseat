import { Org, Prisma } from "@prisma/client";

/*
  * interface ou classe abstrata
*/

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
};
