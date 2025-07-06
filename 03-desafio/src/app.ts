import fastify from "fastify";
import { PrismaClient } from "generated/prisma";

export const app = fastify();

// Instanciando conexão de schama do banco de dados (tipagem completa)
const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Henrique",
    email: "XXXXXXXXXXXXXXXXXX",
    password_hash: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    address: "XXXXXXXXXXXXXXXXXX",
    phone: "XXXXXXXXXXXXXXXXXX",
    postal_code: "XXXXXXXXXXXXXXXXXX",
  },
});
