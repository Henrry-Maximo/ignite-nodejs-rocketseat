import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export async function mealController(app: FastifyInstance) {
  // retornar lista de cadastro de itens do usuário
  app.get('/', async (req, reply) => {
    try {
      const { sessionId } = req.cookies

      if (sessionId) {
        const overviewMeals = await knex('daily_feed')
          .where('session_id', sessionId)
          .select('*')

        reply.status(200).send(overviewMeals)
      }

      // if not exists sessionId
      reply.status(200).send({
        message: 'User not have id cookie. Please, log into the system.',
      })
    } catch (err) {
      reply.status(500).send({ message: `Error: ${err}` })
    }
  })

  // retornar informações da refeição por id
  app.get('/search/:id', async (req, reply) => {
    try {
      const getIdMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getIdMealsParamsSchema.parse(req.params)

      if (id) {
        const [overviewByUser] = await knex('daily_feed').where({ id })
        reply.status(200).send(overviewByUser)
      }
    } catch (err) {
      return reply.status(500).send({ message: `Error: ${err}` })
    }
  })

  // retornar todas as refeições do usuário pelo session_id
  app.get('/search-by-user/:id', async (req, reply) => {
    try {
      const getIdUserParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getIdUserParamsSchema.parse(req.params)

      const rows = await knex('daily_feed').where('session_id', id).select('*')
      reply.status(200).send(rows)
    } catch (err) {
      console.error(err)
    }
  })

  // retornar todas as refeições do usuário pelo session_id
  app.get('/search-by-user-sum/:id', async (req, reply) => {
    try {
      const getIdUserParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getIdUserParamsSchema.parse(req.params)

      // melhor sequência de refeições dentro da dieta
      const totalFeeds = await knex('daily_feed')
        .where('session_id', id)
        .orderBy('created_at')

      const totalOnDiet = await knex('daily_feed')
        .where('session_id', id)
        .where('inDiet', true)
        .count('id as total')
        .first()

      const totalOffDiet = await knex('daily_feed')
        .where('session_id', id)
        .where('inDiet', false)
        .count('id as total')
        .first()

      const bestOnDietSequence = totalFeeds.reduce(
        (acc, currentValue) => {
          if (currentValue.inDiet === true) {
            acc.currentSequence += 1
          } else {
            acc.currentSequence = 0
          }

          if (acc.currentSequence > acc.bestSequenceDiet) {
            acc.bestSequenceDiet = acc.currentSequence
          }

          return acc
        },
        { bestSequenceDiet: 0, currentSequence: 0 },
      )

      return reply.send({
        totalMeals: totalFeeds.length,
        totalMealsOnDiet: totalOnDiet,
        totalMealsOffDiet: totalOffDiet,
        bestOnDietSequence,
      })
    } catch (err) {
      console.error(err)
    }
  })

  // registrar refeição no database e criar id_cookie_user
  app.post('/register', async (req, reply) => {
    try {
      const createMealsBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        diet: z.boolean(),
        created: z.string(),
      })

      const { name, description, diet, created } = createMealsBodySchema.parse(
        req.body,
      )

      const idUser = req.cookies.sessionId
      if (idUser) {
        await knex('daily_feed').insert({
          id: randomUUID(),
          name,
          description,
          inDiet: diet,
          created_at: created,
          session_id: idUser,
        })
        reply.status(200).send({
          message: 'Meal registered with success.',
        })
      }

      reply.status(200).send({ message: 'User not have a id cookie.' })
    } catch (err) {
      return reply
        .status(400)
        .send({ message: 'Error at registration of meal.' })
    }
  })

  // editar uma refeição do usuário
  app.put('/edit-meal/:id', async (req, reply) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const getMealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.boolean(),
      created: z.string().date(),
    })

    const { id } = getMealsParamsSchema.parse(req.params)
    const { name, description, diet, created } = getMealsBodySchema.parse(
      req.body,
    )

    const mealUpdateNow = await knex('daily_feed')
      .where({ id })
      .update({
        name,
        description,
        inDiet: diet,
        created_at: created,
        updated_at: knex.fn.now(),
      })
      .returning('*')

    reply.status(200).send(mealUpdateNow)
  })

  app.delete('/delete/:id', async (req, reply) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getMealsParamsSchema.parse(req.params)

    if (id) {
      await knex('daily_feed').delete().where('id', id).returning(id)
    } else {
      return reply
        .status(400)
        .send({ message: 'id especificado não encontrado.' })
    }
  })
}
