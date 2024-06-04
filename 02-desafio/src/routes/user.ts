import { FastifyInstance } from "fastify";

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
  app.post("/", (req, reply) => {
    try {
      const { user, password } = req.body as userType;

    if (!user || !password) {
      return reply
        .status(401)
        .send({ message: "usuário ou senha são requeridos." });
    }

    const { userInDatabase, passwordInDatabase } = data[0];
    console.log(data[0])

    if (user == userInDatabase && password == passwordInDatabase) {
      return reply
        .status(200)
        .send({
          dados: `usuário: ${userInDatabase}, senha: ${passwordInDatabase}`,
          message: "Login feito com sucesso!",
        });
    } else {
      return reply
        .status(401)
        .send({
          message: "Falha no login!",
        });
    }
    
    } catch(err) {
      console.error(err);
    }
  });

  // app.post("/registration", (req, reply) => {
  //   const { user, password } = req.body;
  // });
}
