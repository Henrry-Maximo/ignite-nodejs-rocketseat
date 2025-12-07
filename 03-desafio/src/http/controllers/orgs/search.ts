import { makeSearchOrgsUseCase } from '@/use-cases/factories/make-search-orgs-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';


export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const searchOrgs = z.object({
    name: z.string().optional(),
  });

  const { name } = searchOrgs.parse(req.body);

  try {
    const searchOrgsBodyUseCase = makeSearchOrgsUseCase();

    const {  orgs } = await searchOrgsBodyUseCase.execute({ name });

    if (!orgs) {
      throw new SearchOrgsNonError();
    }

    return reply.status(200).send({ orgs })
  } catch (err) {
    if (err instanceof SearchOrgsNonError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
};
