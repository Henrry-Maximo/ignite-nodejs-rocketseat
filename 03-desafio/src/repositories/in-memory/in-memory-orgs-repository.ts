import { Org, Prisma, Role } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      postal_code: data.postal_code,
      phone: data.phone,
      role: data.role ?? Role.MEMBER,
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

  async searchMany(name?: string): Promise<Org[]> {
    const orgs = this.items.filter((item) => item.name.includes(name ?? ''));

    return orgs;
  }
}
