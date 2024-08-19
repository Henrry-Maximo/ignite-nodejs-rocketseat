import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";

// import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const formatRegisterBody = z.object({
    name: z.string(),
    password: z.string(),
    email: z.coerce.string().email().min(5),
  });

  const { name, password, email } = formatRegisterBody.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    await registerUseCase.execute({
      name,
      password,
      email,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
