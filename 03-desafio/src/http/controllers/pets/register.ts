import { OrganizationNotExists } from '@/use-cases/errors/organization-not-exists';
import { makeRegisterPetsUseCase } from '@/use-cases/factories/make-register-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["available", "adopted", "reserved", "unavailable"]),
    age: z.enum(["puppy", "young", "adult"]),
    size: z.enum(["small", "medium", "large"]),
    power: z.enum(["low", "moderate", "high"]),
    independence: z.enum(["low", "medium", "high"]),
    ambience: z.enum(["small", "medium", "large"]),
    path: z.string(),
    requisites: z.array(z.string()),

    org: z.string(),
  });

  const data = createBodySchema.parse(req.body);

  try {
    const registerPetsUseCase = makeRegisterPetsUseCase();

    const { pet } = await registerPetsUseCase.execute(data);

    return reply.status(201).send({ pet });
  } catch (err) {
    if (err instanceof OrganizationNotExists) {
      return reply.status(404).send({ message: err.message })
    }

    throw err; // erros pro handler global
  }
}
