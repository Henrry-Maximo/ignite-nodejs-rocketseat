import fastify from "fastify";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);

// Instanciando conexão de schama do banco de dados (tipagem completa)
// const prisma = new PrismaClient();

// prisma.org.create({
//   data: {
//     name: "xxxxxxxx",
//     email: "xxxxxxxxxxxxxxxxxxxxx",
//     password_hash: "xxxxxxxxxxxxxxx",
//     address: "xxxxxxxxxxxxxxx",
//     postal_code: "xxxxxxxxxxxxxxx",
//     phone: "xxxxxxxxxxxxxxx",
//     city: "xxxxxxxxxxxxxxx",
//   },
// });
