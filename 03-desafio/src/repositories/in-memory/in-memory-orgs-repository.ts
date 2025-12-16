import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

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

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  searchMany(name?: string): Promise<Org[]> {
    throw new Error('Method not implemented.');
  }
}
