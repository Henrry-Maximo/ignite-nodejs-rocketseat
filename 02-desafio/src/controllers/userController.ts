import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export async function userController(app: FastifyInstance) {
  app.get('/', async () => {
    const tables = await knex('daily_users').select('*')
    return tables
  })

  app.post('/register', async (req, reply) => {
    try {
      const getCredentialsBodyRequest = z
        .object({
          user: z.string(),
          password: z.string().min(4).max(12),
        })
        .superRefine(({ user, password }, ctx) => {
          if (!user || !password) {
            ctx.addIssue({
              code: 'custom',
              message: 'The user/passwords did not match',
              path: ['password'],
            })
          }
        })

      const { user, password } = getCredentialsBodyRequest.parse(req.body)

      // inserir na tabela 'daily_users'
      await knex('daily_users').insert({
        id: randomUUID(),
        name: user,
        password,
        created_at: Date.now(),
      })
      reply.status(200).send({ registration: user })
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.status(400).send({
          message: 'Validation failed',
        })
      } else {
        // Handle other types of errors (optional)
        reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  })
}
