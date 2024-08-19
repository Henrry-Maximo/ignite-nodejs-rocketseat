import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib";
import { z } from "zod";
import { hash } from "bcryptjs";
import { registerUseCase } from "@/use-cases/register";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const formatRegisterBody = z.object({
    name: z.string(),
    password: z.string(),
    email: z.coerce.string().email().min(5),
  });

  const { name, password, email } = formatRegisterBody.parse(req.body);

  try { 
    await registerUseCase({
      name, password, email
  })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send();
}
