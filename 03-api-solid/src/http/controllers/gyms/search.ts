import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(req.body);

  const searchGymBodyUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymBodyUseCase.execute({
    query: q,
    page,
  });

  return reply.status(201).send({ gyms });
}
