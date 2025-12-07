import { PetWithoutAssociateWithOrg } from '@/use-cases/errors/pet-without-associate-with-org';
import { makeUserProfileUseCase } from '@/use-cases/factories/make-user-profile-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function registerPets(_: FastifyRequest, reply: FastifyReply) {
  try {
    const userProfileUseCase = makeUserProfileUseCase();

    const { org } = await userProfileUseCase.execute();

    return reply.status(201).send({ org });
  } catch (err) {
    if (err instanceof PetWithoutAssociateWithOrg) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
