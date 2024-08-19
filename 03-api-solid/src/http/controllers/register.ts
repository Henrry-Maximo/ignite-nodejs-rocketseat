import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib";
import { z } from "zod";
import { hash } from "crypto";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const formatRegisterBody = z.object({
    name: z.string(),
    password: z.string(),
    email: z.coerce.string().email().min(5),
  });

  const { name, password, email } = formatRegisterBody.parse(req.body);

  const password_hash = await hash(password, 6);
  const userWithSameEmail = await prisma.user.findUnique({ where: { email }})

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.user.create({ data: { name, password_hash, email } });

  return reply.status(201).send();
}
