import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository';
import { randomUUID } from 'node:crypto';

// interface orgsBodySchema {
//   id?: string;
//   name: string;
//   email: string;
//   postal_code: string;
//   address: string;
//   city: string;
//   phone: string;
//   password_hash: string;
//   created_at?: Date | string;
// };

export class InMemoryOrgsRepository implements OrgsRepository {
  searchMany(name?: string): Promise<Org[]> {
    throw new Error('Method not implemented.');
  }
  public items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: String(randomUUID()),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      postal_code: data.postal_code,
      phone: data.phone,
      created_at: new Date(),
    };

    this.items.push(org);
    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  // public orgs: orgsBodySchema[] = [];

  // async create(data: Prisma.OrgCreateInput) {
  //   this.orgs.push(data);
  // }
}
