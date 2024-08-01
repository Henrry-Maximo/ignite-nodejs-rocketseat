import { FastifyInstance } from 'fastify'
import { userController } from '../controllers/userController'
import { mealController } from '../controllers/mealController'

export async function routes(app: FastifyInstance) {
  app.register(userController, { prefix: '/user' })
  app.register(mealController, { prefix: '/meal' })
}
