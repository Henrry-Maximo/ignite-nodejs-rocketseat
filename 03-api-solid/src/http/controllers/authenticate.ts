import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { AuthenticateUseCase } from "@/use-cases/authenticate";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    password: z.string().max(3),
    email: z.coerce.string().email().min(5),
  });

  const { password, email } = authenticateBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

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
