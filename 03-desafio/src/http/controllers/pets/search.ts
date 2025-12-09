import { makeSearchOrgsUseCase } from "@/use-cases/factories/make-search-orgs-use-case";
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchPetsQuerySchema = z.object({
  name: z.string().optional(),
});

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name } = searchPetsQuerySchema.parse(req.query);

  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({ name });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof SearchPetsNonError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send("Server internal error.")
  }
};
