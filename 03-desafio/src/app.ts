import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { appRoutes } from "./http/routes";
import { env } from "./env";

import { ZodError } from "zod";
import { EmailAlreadyExistsError } from "./use-cases/errors/email-already-exists-error";
import { PetWithoutAssociateWithOrg } from "./use-cases/errors/pet-without-associate-with-org";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  // Qualquer tipo de validação com o zod que dê errado
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});

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
