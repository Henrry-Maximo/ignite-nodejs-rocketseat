import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";

interface userType {
  user: string;
  password: string;
}

interface userArrayType {
  userInDatabase: string;
  passwordInDatabase: string;
}

const data:userArrayType[] = [
  {
    userInDatabase: "Henrique",
    passwordInDatabase: "@123",
  },
];

export async function userRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const tables = await knex('daily_users').select('*')    
    return tables;
  })

  app.post("/register", async (req, reply) => {
    try {
      const { user, password } = req.body as userType;

    if (!user || !password) {
      return reply
        .status(401)
        .send({ message: "usuário ou senha são requeridos." });
    }

    // inserir na tabela 'daily_users'
    await knex("daily_users").insert({
     id: randomUUID(),
     name: user,
     password: password,
     created_at: Date.now(),
    })

    // if (user == userInDatabase && password == passwordInDatabase) {
    //   return reply
    //     .status(200)
    //     .send({
    //       dados: `usuário: ${userInDatabase}, senha: ${passwordInDatabase}`,
    //       message: "Login feito com sucesso!",
    //     });
    // } else {
    //   return reply
    //     .status(401)
    //     .send({
    //       message: "Falha no login!",
    //     });
    } catch(err) {
      console.error(err);
    }
  });

  // app.post("/registration", (req, reply) => {
  //   const { user, password } = req.body;
  // });
}
