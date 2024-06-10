import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";

interface FeedType {
  name: string,
  description: string,
  diet: boolean
}

export async function feedController(app: FastifyInstance) {
  app.get("/", async (req, reply) =>  {
    const feedAllInDatabase = await  knex("daily_feed").select('*');
    return feedAllInDatabase;
  });

  app.post("/register", async (req, reply) => {
    try {
      // tratar error ✔
      // obter dados da requisição ✔
      // verificar integridade dos dados ✔
      // cadastrar refeição
      // responder a requsição
      const {name, description, diet} = req.body as FeedType;

      if (name.length == 0 || description.length == 0 || diet == undefined) {
        reply.status(402).send({ message: "Um dos campos encontra-se não preenchido." })
      } else {
        reply.status(200).send({ nome: `${name}`, descrição: `${description}`, emDieta: `${diet}` });
      }

      // await knex("daily_feed").insert({
      //   id: randomUUID(),
      //   name: name,
      //   description: description,
      //   inDiet: diet
      // })

    } catch(err) {
      console.error(`Houve um problema na hora de cadastrar uma refeição ${err}`)
    }
  });
}
