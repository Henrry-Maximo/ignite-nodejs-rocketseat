import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeDeletePetsUseCase } from "@/use-cases/factories/make-delete-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const deletePetsParamsSchema = z.object({
  id: z.string(),
});

export const deletePets = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = deletePetsParamsSchema.parse(req.params);

  try {
    const deletePetsUseCase = makeDeletePetsUseCase();

    await deletePetsUseCase.execute({ id });
    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: "Pet not found" });
    }

    throw err;
  }
};
