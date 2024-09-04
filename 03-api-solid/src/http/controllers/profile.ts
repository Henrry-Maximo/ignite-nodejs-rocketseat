import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // console.log(request.headers);
  await request.jwtVerify(); // garantir autenticidade

  console.log(request.user.sub);
  console.log(request.user.iat);

  return reply.status(200).send();
}
