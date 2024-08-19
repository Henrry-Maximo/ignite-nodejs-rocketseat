import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUserRepository } from "@/repositories/prisma-users-repository";

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
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
