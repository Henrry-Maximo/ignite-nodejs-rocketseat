import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib";

export const app = fastify();

app.post("/users-register", async function (req, reply) {
  const formatRegisterBody = z.object({
    name: z.string(),
    password: z.string(),
    email: z.coerce.string().email().min(5),
  });

  const { name, password, email } = formatRegisterBody.parse(req.body);

  await prisma.user.create({ data: { name, password_hash: password, email } });

  return reply.status(201).send();
});
