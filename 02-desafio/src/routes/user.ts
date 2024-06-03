import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {

  app.get("/", (req, reply) => {
    const {user, password} = req.body;

    // console.log("Login feito com sucesso!");
    return reply.status(200).send({ message: "teste"});
  });

  app.post("/registration", (req, reply) => {
    const {user, password} = req.body;

    
  })
}