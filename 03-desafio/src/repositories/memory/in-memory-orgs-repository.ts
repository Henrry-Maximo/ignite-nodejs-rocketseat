
import { Prisma } from "@prisma/client";

interface orgsBodySchema {
  id?: string;
  name: string;
  email: string;
  postal_code: string;
  address: string;
  city: string;
  phone: string;
  password_hash: string;
  created_at?: Date | string;
};

export class InMemoryOrgsRepository {
  public orgs: orgsBodySchema[] = [];

  async create(data: Prisma.OrgCreateInput) {
    this.orgs.push(data);
  }
}
