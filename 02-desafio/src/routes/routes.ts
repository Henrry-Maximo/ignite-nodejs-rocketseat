import { FastifyInstance } from 'fastify'
import { userController } from '../controllers/userController'
import { mealController } from '../controllers/mealController'

/* 
Plugin -> precisa ser uma função assíncrona
Typescript `app` -> especificar do que se trata
*/

export async function routes(app: FastifyInstance) {
  app.register(userController, { prefix: '/user' })
  app.register(mealController, { prefix: '/meal' })
}
