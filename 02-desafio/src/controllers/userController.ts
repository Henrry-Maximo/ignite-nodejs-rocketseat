import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'

export async function userController(app: FastifyInstance) {
  // retorna todos os usuários
  app.get('/', async () => {
    return await knex('daily_users').select('*')
  })

  // registra um usuário
  app.post('/register', async (req, reply) => {
    try {
      const getCredentialsBodyRequest = z
        .object({
          user: z.string(),
          password: z.string().min(4).max(12),
          email: z.string().email(),
        })
        .superRefine(({ user, password, email }, ctx) => {
          if (!user || !password || !email) {
            ctx.addIssue({
              code: 'custom',
              message: 'The user/passwords did not match',
            })
          }
        })

      let sessionId = req.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 8 days
        })
      }

      const { user, password, email } = getCredentialsBodyRequest.parse(
        req.body,
      )

      // inserir na tabela 'daily_users'
      await knex('daily_users').insert({
        id: randomUUID(),
        name: user,
        password,
        email,
        created_at: Date.now(),
        session_id: sessionId,
      })
      reply.status(200).send({ user })
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.status(400).send({ message: 'Validation failed' })
      } else {
        reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  })
}
