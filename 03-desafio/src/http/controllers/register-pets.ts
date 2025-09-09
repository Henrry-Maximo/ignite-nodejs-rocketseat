import { PetWithoutAssociateWithOrg } from '@/use-cases/errors/pet-without-associate-with-org';
import { makeRegisterPetsUseCase } from '@/use-cases/factories/make-register-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function registerPets(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
    size: z.enum(['PEQUENINO', 'MEDIANO', 'GRANDINHO']),
    power: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
    independence: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
    ambience: z.enum(['PEQUENO', 'AMPLO']),
    status: z.enum(['DISPONÍVEL', 'INDISPONÍVEL']),
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
