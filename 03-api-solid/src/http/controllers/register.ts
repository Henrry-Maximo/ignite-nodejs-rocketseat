import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
// import { RegisterUseCase } from "@/use-cases/register";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

// import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const formatRegisterBody = z.object({
    name: z.string(),
    password: z.string().max(3),
    email: z.coerce.string().email().min(5),
  });

  const { name, password, email } = formatRegisterBody.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      password,
      email,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
    // return reply.status(500).send(); // TODO: fix me
  }

  return reply.status(201).send();
}
