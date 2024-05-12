import { FastifyReply, FastifyRequest } from "fastify";

// forma de compartilhar regra de negócio
export async function checkSessionIdExists(req: FastifyRequest, reply: FastifyReply) {
  // utilizar cookie para buscar somente as transações do usuário que fez o envio
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorizad" });
  }
}