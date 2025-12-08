import { makeSearchOrgsUseCase } from "@/use-cases/factories/make-search-orgs-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchPetsQuerySchema = z.object({
  name: z.string().optional(),
});

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name } = searchPetsQuerySchema.parse(req.query);

  try {
    const searchOrgsBodyUseCase = makeSearchOrgsUseCase();

    const { orgs } = await searchOrgsBodyUseCase.execute({ name });

    if (!orgs) {
      throw new SearchOrgsNonError();
    }

    return reply.status(200).send({ orgs });
  } catch (err) {
    if (err instanceof SearchOrgsNonError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send("Server internal error.")
  }
};
