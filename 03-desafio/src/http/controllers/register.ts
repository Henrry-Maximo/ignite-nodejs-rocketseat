import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6).max(32),
    email: z.string().email(),
    postal_code: z.string(),
    address: z.string(),
    phone: z.string(),
  });

  const data = registerBodySchema.parse(req.body);

  /*
    try {} catch () {} -> envolver use case para retornar o erro gerado
    por ErrorConstructor
  */
  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute(data);
  } catch (err) {
    // TYPE GUARD: Verifica se err é uma instância específica de EmailAlreadyExistsError
    // Permite ao TypeScript saber o tipo exato e acessar propriedades com segurança
    if (err instanceof EmailAlreadyExistsError) {
      // TYPE SAFETY: TypeScript garante que só acessamos propriedades que existem
      // Sem type guard, err.message daria erro porque err é 'unknown'
      return reply.status(409).send({ message: err.message });
    }

    // if (err instanceof ServerInternalError) {
    //   return reply.status(500).send({ message: err.message });
    // }

    throw err;
  }

  // Operações de criação / atualização / remoção : não há necessidade de retorno
  return reply
    .status(201)
    .send({ message: 'Organization registered successfully!' });
};
