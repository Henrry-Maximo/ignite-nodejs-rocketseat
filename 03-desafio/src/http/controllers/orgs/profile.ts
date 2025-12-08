import { makeGetOrgProfileUseCase } from "@/use-cases/factories/make-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase();

  const { org } = await getOrgProfile.execute({
    orgId: req.user.sub
  });

  return reply.status(201).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  });
}
