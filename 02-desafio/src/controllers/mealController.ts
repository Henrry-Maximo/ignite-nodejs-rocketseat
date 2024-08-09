import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealController(app: FastifyInstance) {
  // retornar as refeições de todos os usuários
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    try {
      const meals = await knex('daily_feed').select()

      return reply.status(200).send(meals)
    } catch (err) {
      return reply.status(500).send({ message: 'Server Internal Error' })
    }
  })

  // retornar as refeições do usuário logado
  app.get(
    '/user',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      try {
        const { sessionId } = req.cookies

        if (sessionId) {
          const overviewMeals = await knex('daily_feed')
            .where('session_id', sessionId)
            .select('*')

          if (overviewMeals.length > 0) {
            reply.status(200).send(overviewMeals)
          } else {
            return reply.status(204).send()
          }
        }
      } catch (err) {
        reply.status(500).send({ message: `Error: ${err}` })
      }
    },
  )

  // retornar informações da refeição por id
  app.get(
    '/search/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      try {
        const getIdMealsParamsSchema = z.object({
          id: z.string().uuid(),
        })

        const { id } = getIdMealsParamsSchema.parse(req.params)
        const { sessionId } = req.cookies

        const uniqueMealUser = await knex('daily_feed')
          .where({
            id,
            session_id: sessionId,
          })
          .returning('*')

        if (uniqueMealUser.length > 0) {
          return reply.status(200).send(uniqueMealUser)
        } else {
          return reply.status(401).send({ message: 'Unauthorized.' })
        }
      } catch (err) {
        return reply.status(500).send({ message: `Error: ${err}` })
      }
    },
  )

  // retornar as refeições do usuário pelo session_id
  app.get(
    '/search-by-user/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      try {
        const getIdUserParamsSchema = z.object({
          id: z.string().uuid(),
        })
        const { id } = getIdUserParamsSchema.parse(req.params)

        const rows = await knex('daily_feed')
          .where('session_id', id)
          .select('*')
        reply.status(200).send(rows)
      } catch (err) {
        console.error(err)
      }
    },
  )

  // retornar as métricas do usuário pelo session_id
  app.get(
    '/search-by-user-sum/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
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
    },
  )

  // registrar refeição
  app.post(
    '/register',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      try {
        const createMealsBodySchema = z.object({
          name: z.string(),
          description: z.string(),
          diet: z.boolean(),
          created: z.string(),
        })

        const { name, description, diet, created } =
          createMealsBodySchema.parse(req.body)
        const sessionId = req.cookies.sessionId

        const listUpdateMeal = await knex('daily_feed')
          .insert({
            id: randomUUID(),
            name,
            description,
            inDiet: diet,
            created_at: created,
            session_id: sessionId,
          })
          .returning('*')

        if (listUpdateMeal) {
          reply.status(200).send({
            message: 'Meal registered with success.',
          })
        } else {
          reply.status(204).send()
        }
      } catch (err) {
        return reply
          .status(400)
          .send({ message: 'Error at registration of meal.' })
      }
    },
  )

  // editar refeição
  app.put(
    '/edit/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      try {
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

        const { sessionId } = req.cookies
        const mealUpdateNow = await knex('daily_feed')
          .where({ id, session_id: sessionId })
          .update({
            name,
            description,
            inDiet: diet,
            created_at: created,
            updated_at: knex.fn.now(),
          })
          .returning('*')

        if (mealUpdateNow.length > 0) {
          reply.status(200).send(mealUpdateNow)
        } else {
          reply.status(204).send()
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: 'Id not Found.' })
        } else {
          app.log.error(err)
          return reply.status(500).send({ message: 'Internal Server Error' })
        }
      }
    },
  )

  // deletar refeição
  app.delete(
    '/delete/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      try {
        const getMealsParamsSchema = z.object({
          id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(req.params)
        const { sessionId } = req.cookies

        const mealDelete = await knex('daily_feed')
          .where({
            id,
            session_id: sessionId,
          })
          .del()

        if (mealDelete) {
          return reply
            .status(200)
            .send({ message: 'Meal deleted successfully.' })
        } else {
          return reply.status(204).send()
        }
      } catch (err) {
        app.log.error(err)
        return reply.status(500).send({ message: 'Internal Server Error' })
      }
    },
  )
}
