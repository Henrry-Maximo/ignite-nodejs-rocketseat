import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
