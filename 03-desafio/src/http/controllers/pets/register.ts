import { PetWithoutAssociateWithOrg } from '@/use-cases/errors/pet-without-associate-with-org';
import { makeRegisterPetsUseCase } from '@/use-cases/factories/make-register-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["AVAILABLE", "ADOPTED", "RESERVED", "UNAVAILABLE"]),
    age: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    power: z.enum(["LOW", "MODERATE", "HIGH"]),
    independence: z.enum(["LOW", "MEDIUM", "HIGH"]),
    ambience: z.enum(["SMALL_SPACE", "MEDIUM_SPACE", "LARGE_SPACE"]),
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
    if (err instanceof PetWithoutAssociateWithOrg) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
