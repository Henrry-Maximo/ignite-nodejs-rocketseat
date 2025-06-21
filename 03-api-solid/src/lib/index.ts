import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

// conexão com o banco de dados (arquivo isolado)
export const prisma = new PrismaClient({
  // exibir operações sql feitas no banco de dados
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
