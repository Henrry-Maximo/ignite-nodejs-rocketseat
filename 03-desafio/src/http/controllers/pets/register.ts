import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
	const typingRegisterBody = z.object({
		name: z.string(),
		description: z.string().max(300),
		age: z.enum([""]),
		size: z.enum([""]),
		power: z.enum([""]),
		independence: z.enum([""]),
		ambience: z.enum([""]),
		requisite: z.string(),
	});

	const {
		name,
		description,
		age,
		size,
		power,
		independence,
		ambience,
		requisite
	} = typingRegisterBody.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name, description, age, size, power, independence, ambience, requisite
    })

  } catch (error) {
    return reply.status(500).send({
      error
    })
  }
}
