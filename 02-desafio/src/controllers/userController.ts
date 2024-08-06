import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function userController(app: FastifyInstance) {
  // retorna todos os usuários
  app.get("/", async () => {
    return await knex("daily_users").select("*");
  });

  // registra um usuário
  app.post("/register", async (req, reply) => {
    try {
      const getCredentialsBodyRequest = z.object({
        user: z.string().min(1, "User is required! 😡"),
        password: z.string().min(4, "Password must be at least 4 characters. 😡").max(12, "Password must not exceed 12 characters."),
        email: z.string().email("Invalid email address. 😡"),
      });

      const { user, password, email } = getCredentialsBodyRequest.parse(
        req.body
      );

      // getCredentialsBodyRequest.superRefine(({ user, password, email }, ctx) => {
      //   if (!user || !password || !email) {
      //     ctx.addIssue({
      //       code: 'custom',
      //       message: 'The user/passwords/email did not match 😡',
      //     })
      //   }
      // })

      let sessionId = req.cookies.sessionId;
      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie("sessionId", sessionId, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }

      const userExistEmail = await knex("daily_users").where({ email }).first();
      if (userExistEmail) {
        return reply
          .status(400)
          .send({ message: "You are already registered" });
      }

      await knex("daily_users").insert({
        id: randomUUID(),
        name: user,
        password,
        email,
        created_at: new Date().getTime(),
        session_id: sessionId,
      });

      reply.status(201).send({ message: "User Created with Successful" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.status(400).send({ message: "Validation failed", error: err.issues[0].message });
      } else {
        reply.status(500).send({ message: "Internal Server Error" });
      }
    }
  });
}
