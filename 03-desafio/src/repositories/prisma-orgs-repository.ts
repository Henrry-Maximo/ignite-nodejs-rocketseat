import { prisma } from "@/lib/prisma";

import { Prisma } from "@prisma/client";

/*
  Responsabilidade: todas as operações no banco de dados
  irão passar pelos repositorys
*/
export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}

/*
  new PrismaOrgsRepository().create({});
  - Intânciando o objeto temos acesso as propriedades
*/
