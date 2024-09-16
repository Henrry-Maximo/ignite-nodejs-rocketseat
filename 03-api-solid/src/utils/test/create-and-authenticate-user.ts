import { prisma } from "@/lib";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

interface PropsRegister {
  name: string;
  email: string;
  password: string;
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("12345678", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });
  // await request(app.server)
  //   .post("/users")
  //   .send(<PropsRegister>{
  //     name: "Johh Doe",
  //     email: "johndoe@example.com",
  //     password: "@123456",
  //   });

  const authResponse = await request(app.server)
    .post("/sessions")
    .send(<PropsRegister>{
      email: "johndoe@example.com",
      password: "12345678",
    });

  const { token } = authResponse.body;

  return {
    token,
  };
}
