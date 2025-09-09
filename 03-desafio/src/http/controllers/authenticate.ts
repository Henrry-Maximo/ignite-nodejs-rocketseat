import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export const authenticate = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    // const prismaOrgsRepository = new PrismaOrgsRepository();
    // const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository);
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  // Operações de criação / atualização / remoção : não há necessidade de retorno
  return reply.status(200).send();
};
