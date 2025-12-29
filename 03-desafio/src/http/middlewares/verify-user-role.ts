import { FastifyReply, FastifyRequest } from "fastify";


export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user;
  
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized." });
    }
  }
}

// export async function verifyUserRole(req: FastifyRequest, reply: FastifyReply) {
//   const { role } = req.user;

//   if (role !== "ADMIN") {
//     return reply.status(401).send({ message: "Unauthorized." });
//   }
// }
