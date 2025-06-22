import { Prisma, User } from "@prisma/client";

// contrato entre os casos de uso e os repositórios
export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
