import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchPetsQuerySchema = z.object({
  city: z.string(),
});

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const { city } = searchPetsQuerySchema.parse(req.query);

  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({ city });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof SearchPetsNonError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send("Server internal error.")
  }
};
