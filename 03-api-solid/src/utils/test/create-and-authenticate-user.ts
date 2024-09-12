import { FastifyInstance } from "fastify";
import request from "supertest";

interface PropsRegister {
  name: string;
  email: string;
  password: string;
}

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
    .post("/users")
    .send(<PropsRegister>{
      name: "Johh Doe",
      email: "johndoe@example.com",
      password: "@123456",
    });

  const authResponse = await request(app.server)
    .post("/sessions")
    .send(<PropsRegister>{
      email: "johndoe@example.com",
      password: "@123456",
    });

  const { token } = authResponse.body;

  return {
    token,
  };
}
