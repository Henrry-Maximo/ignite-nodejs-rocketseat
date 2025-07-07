import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { registerUseCase } from "@/use-cases/register";
import { EmailAlreadyExists } from "@/use-cases/errors/email-already-exists";
import { ServerInternalError } from "@/use-cases/errors/server-internal-error";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(32),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
    phone: z.string(),
  });

  const { name, email, password, address, city, postal_code, phone } =
    registerBodySchema.parse(req.body);

  /*
    try {} catch () {} -> envolver use case para retornar o erro gerado
    por ErrorConstructor
  */
  try {
    await registerUseCase({
      name,
      email,
      password,
      address,
      city,
      postal_code,
      phone,
    });
  } catch (err) {
    // TYPE GUARD: Verifica se err é uma instância específica de EmailAlreadyExists
    // Permite ao TypeScript saber o tipo exato e acessar propriedades com segurança
    if (err instanceof EmailAlreadyExists) {
      // TYPE SAFETY: TypeScript garante que só acessamos propriedades que existem
      // Sem type guard, err.message daria erro porque err é 'unknown'
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ServerInternalError) {
      return reply.status(500).send({ message: err.message });
    }
  }

  // Operações de criação / atualização / remoção : não há necessidade de retorno
  return reply
    .status(201)
    .send({ message: "Organization registered successfully!" });
};
