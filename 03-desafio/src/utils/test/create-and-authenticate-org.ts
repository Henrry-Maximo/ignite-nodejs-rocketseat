import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";

import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance, isAdmin = false) {
  const responseOrg = await prisma.org.create({
    data: {
      name: "Amor & Carinho",
      password_hash: await hash("123456", 6),
      email: "wesley@gmail.com",
      postal_code: "06807-100",
      address: "embu das artes",
      phone: "6581112120",
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const responseAuth = await request(app.server).post("/sessions").send({
    email: "wesley@gmail.com",
    password: "123456",
  });

  const { id } = responseOrg;
  const { token } = responseAuth.body;

  return { id, token };
}
