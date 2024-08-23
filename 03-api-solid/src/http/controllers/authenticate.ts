import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
// import { AuthenticateUseCase } from "@/use-cases/authenticate";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    password: z.string().max(3),
    email: z.coerce.string().email().min(5),
  });

  const { password, email } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      // bad request
      return reply.status(400).send({ message: err.message });
    }

    throw err;
    // return reply.status(500).send(); // TODO: fix me
  }

  return reply.status(200).send();
}
