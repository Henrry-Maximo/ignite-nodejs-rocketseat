
import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

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
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      city: data.city,
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
