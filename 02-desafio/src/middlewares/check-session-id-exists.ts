/* eslint-disable prettier/prettier */
import { FastifyReply, FastifyRequest } from 'fastify'
export async function checkSessionIdExists(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = req.cookies

  if (!sessionId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
