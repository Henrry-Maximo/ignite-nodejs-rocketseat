import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const petsSchemaRequest = z.object({
    name: z.string(),
    description: z.string().max(300),
    age: z.enum(["FILHOTE", "ADULTO", "IDOSO"]),
    size: z.enum(["PEQUENINO", "MEDIANO", "GRANDINHO"]),
    power: z.enum(["BAIXA", "MEDIA", "ALTA"]),
    independence: z.enum(["BAIXO", "MEDIA", "ALTA"]),
    ambience: z.enum(["PEQUENO", "AMPLO"]),
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
    requisite,
  } = petsSchemaRequest.parse(req.body);

  const pet = await prisma.pet.create({
    data: {
      name,
      description,
      age,
      size,
      power,
      independence,
      ambience,
      requisite,
    },
  });

  return reply.status(201).send({ pet });
}
