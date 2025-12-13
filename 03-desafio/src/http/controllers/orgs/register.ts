import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exists-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterOrgsUseCase } from "@/use-cases/factories/make-register-orgs-use-case";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const createOrgsBodySchema = z.object({
    name: z.string().max(95),
    email: z.string().email(),
    password: z.string().min(1),
    phone: z.string().min(1).max(11),
    postal_code: z.string().min(1).max(9),
    address: z.string(),
  });

  const { name, email, password, phone, postal_code, address } =
    createOrgsBodySchema.parse(req.body);

  try {
    const registerOrgsUseCase = makeRegisterOrgsUseCase();

    const { org } = await registerOrgsUseCase.execute({
      name,
      email,
      password,
      address,
      postal_code,
      phone,
    });

    if (!org) {
      throw new ResourceNotFoundError();
    }

    return reply.status(201).send({ org });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: "Email already exists." });
    }

    throw err;
  }
}
