import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export async function feedController(app: FastifyInstance) {
  // retornar lista de cadastro de itens do usuário
  app.get('/', async (req, reply) => {
    try {
      // id_cookie_user
      const { idUsuario } = req.cookies

      if (idUsuario) {
        const feedAllUser = await knex('daily_feed')
          .where('session_id', idUsuario)
          .select('*')

        reply.status(200).send(feedAllUser)
      }

      // if not exists id_cookie_user
      reply.status(200).send({
        message: 'user is not logging. please, created a feed for get an id.',
      })
    } catch (err) {
      reply.status(500).send(err)
    }
  })

  app.get('/search/:id', async (req, reply) => {
    const getIdFeedsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getIdFeedsParamsSchema.parse(req.params)

    const [rows] = await knex('daily_feed').where({ id })
    reply.status(200).send(rows)
  })

  app.post('/register-feed', async (req, reply) => {
    try {
      const createFeedBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        diet: z.boolean(),
      })

      const { name, description, diet } = createFeedBodySchema.parse(req.body)
      let idUser = req.cookies.idUsuario

      if (!idUser) {
        idUser = randomUUID()
      }

      reply.cookie('idUsuario', idUser, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 8 days
      })

      await knex('daily_feed').insert({
        id: randomUUID(),
        name,
        description,
        inDiet: diet,
        session_id: idUser,
      })

      reply.status(200).send({
        nome: `${name}`,
        descrição: `${description}`,
        emDieta: `${diet}`,
        message: 'Refeição cadastrada com sucesso!',
      })
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
