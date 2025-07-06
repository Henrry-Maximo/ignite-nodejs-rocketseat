import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { registerUseCase } from "@/use-cases/register";

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
    return reply.status(409).send(err);
  }

  // Operações de criação / atualização / remoção : não há necessidade de retorno
  return reply
    .status(201)
    .send({ message: "Organization registered successfully!" });
};
