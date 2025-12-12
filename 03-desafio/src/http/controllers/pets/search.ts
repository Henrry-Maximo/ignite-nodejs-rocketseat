import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchPetsQuerySchema = z.object({
  city: z.string(),
  status: z
    .enum(["AVAILABLE", "ADOPTED", "RESERVED", "UNAVAILABLE"])
    .optional(),
  age: z.enum(["PUPPY", "YOUNG", "ADULT", "SENIOR"]).optional(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
  power: z.enum(["LOW", "MODERATE", "HIGH"]).optional(),
  independence: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  ambience: z.enum(["SMALL_SPACE", "MEDIUM_SPACE", "LARGE_SPACE"]).optional(),
});

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const { city, status, age, size, power, independence, ambience } =
    searchPetsQuerySchema.parse(req.query);

  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({
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
