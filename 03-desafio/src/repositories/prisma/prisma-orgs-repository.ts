import { prisma } from '@/lib/prisma';

import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from '../orgs-repository';

/**
 * REPOSITORY PATTERN - Data Access Layer
 *
 * Responsabilidade: Centralizar todas as operações de banco de dados para ORGs
 *
 * Benefícios:
 * - DESACOPLAMENTO: Isola a aplicação do Prisma/banco específico
 * - TESTABILIDADE: Permite mock fácil para testes unitários
 * - MANUTENIBILIDADE: Mudanças de banco afetam apenas esta camada
 * - REUTILIZAÇÃO: Métodos podem ser usados por diferentes use cases
 *
 * Arquitetura: Use Case → Repository → Database
 * OrgsRepository: Contrato bem definido, tipagem correta
 */

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
  /**
   * Cria uma nova organização no banco de dados
   * @param data - Dados da organização seguindo schema do Prisma
   * @returns Organização criada com ID gerado
   */
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async searchMany(name?: string): Promise<Org[]> {
    const orgs = await prisma.org.findMany({
      where: {
        name: {
          contains: name
        }
      }
    });

    return orgs;
  }
}

/*
  new PrismaOrgsRepository().create({});
  - Intânciando o objeto temos acesso as propriedades
*/
