import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

interface FeedType {
  name: string
  description: string
  diet: boolean
}

export async function feedController(app: FastifyInstance) {
  app.get('/', async (req, reply) => {
    let { idUser } = req.cookies

    if (!idUser) {
      idUser = randomUUID()
    }

    reply.cookie('id_usuario', idUser, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    // return reply.status(200).send({ message: `${idUser}` })
    const feedAllInDatabase = await knex('daily_feed').select('*')
    return feedAllInDatabase
  })

  app.post('/register-feed', async (req, reply) => {
    try {
      const { name, description, diet } = req.body as FeedType

      if (name.length === 0 || description.length === 0 || diet === undefined) {
        reply
          .status(402)
          .send({ message: 'Um dos campos encontra-se não preenchido.' })
      } else {
        await knex('daily_feed').insert({
          id: randomUUID(),
          name,
          description,
          inDiet: diet,
        })
        reply.status(200).send({
          nome: `${name}`,
          descrição: `${description}`,
          emDieta: `${diet}`,
          message: 'Refeição cadastrada com sucesso!',
        })
      }
    } catch (err) {
      console.error(`Houve um problema no cadastro da refeição: ${err}`)
    }
  })

  app.put('/edit-feed/:id', async (req, reply) => {
    const getFeedsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const getFeedsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.boolean(),
    })

    const { id } = getFeedsParamsSchema.parse(req.params)
    const { name, description, diet } = getFeedsBodySchema.parse(req.body)

    // const feedOneOnlyInDatabase = await knex('daily_feed')
    //   .where('id', id)
    //   .first()

    await knex('daily_feed').where({ id }).update({
      name,
      description,
      inDiet: diet,
    })

    const feedUpdateRecent = await knex('daily_feed').where('id', id)
    reply
      .status(200)
      .send({ message: 'Atualizado com sucesso!', body: feedUpdateRecent })

    // const feeds = await knex('daily_feed').where({ id }).first()
    // return { feeds }
  })

  app.delete('/delete-feed/:id', async (req, reply) => {
    const getFeedsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getFeedsParamsSchema.parse(req.params)

    if (id) {
      await knex('daily_feed').delete().where('id', id).returning(id)
    } else {
      return reply
        .status(400)
        .send({ message: 'id especificado não encontrado.' })
    }
  })
}
