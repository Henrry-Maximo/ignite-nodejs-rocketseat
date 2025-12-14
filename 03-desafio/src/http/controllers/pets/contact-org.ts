import { OrgnizationNotHavePhoneError } from "@/use-cases/errors/organization-not-have-phone-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeContactOrgsPetsUseCase } from "@/use-cases/factories/make-contact-orgs-pets-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const searchPetsParamsSchema = z.object({
  petId: z.string(),
});

export const handle = async (req: FastifyRequest, reply: FastifyReply) => {
  const { petId } = searchPetsParamsSchema.parse(req.params);

  try {
    const contactPetsOrgsUseCase = makeContactOrgsPetsUseCase();

    const { whatsappUrl } = await contactPetsOrgsUseCase.execute({ id: petId });

    return reply.status(200).send({ whatsappUrl });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof OrgnizationNotHavePhoneError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send("Server internal error.");
  }
};