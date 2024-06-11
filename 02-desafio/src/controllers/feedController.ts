import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";

interface FeedType {
  name: string;
  description: string;
  diet: boolean;
}

export async function feedController(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    let { id_usuario } = req.cookies;

    if (!id_usuario) {
      id_usuario = randomUUID();
    }

    reply.cookie("id_usuario", id_usuario, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    return reply.status(200).send({ message: `${id_usuario}` })
    // const feedAllInDatabase = await knex("daily_feed").select("*");
    // return feedAllInDatabase;
  });

  app.post("/register-feed", async (req, reply) => {
    try {
      const { name, description, diet } = req.body as FeedType;

      if (name.length == 0 || description.length == 0 || diet == undefined) {
        reply
          .status(402)
          .send({ message: "Um dos campos encontra-se não preenchido." });
      } else {
        await knex("daily_feed").insert({
          id: randomUUID(),
          name: name,
          description: description,
          inDiet: diet,
        });
        reply
          .status(200)
          .send({
            nome: `${name}`,
            descrição: `${description}`,
            emDieta: `${diet}`,
            message: "Refeição cadastrada com sucesso!",
          });
      }
    } catch (err) {
      console.error(`Houve um problema no cadastro da refeição: ${err}`);
    }
  });

  // app.put('/edit-feed', () => {

  // })

  // app.delete('/delete-feed', () => {

  // })
}
