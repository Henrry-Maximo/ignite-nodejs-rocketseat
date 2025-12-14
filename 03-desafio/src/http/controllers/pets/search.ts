import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchPetsQuerySchema = z.object({
  id: z.string(),
  city: z.string(),
  status: z
    .enum(["available", "adopted", "reserved", "unavailable"])
    .optional(),
  age: z.enum(["puppy", "young", "adult"]).optional(),
  size: z.enum(["small", "medium", "large"]).optional(),
  power: z.enum(["low", "moderate", "high"]).optional(),
  independence: z.enum(["low", "medium", "high"]).optional(),
  ambience: z.enum(["small", "medium", "large"]).optional(),
});

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id, city, status, age, size, power, independence, ambience } =
    searchPetsQuerySchema.parse(req.query);

  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({
      id,
      city,
      status,
      age,
      size,
      power,
      independence,
      ambience,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    // if (err instanceof SearchPetsNonError) {
    //   return reply.status(404).send({ message: err.message });
    // }

    return reply.status(500).send("Server internal error.");
  }
};
