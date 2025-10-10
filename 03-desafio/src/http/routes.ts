import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { registerPets } from './controllers/register-pets';

export async function appRoutes(app: FastifyInstance) {
  app.get('/orgs', register);
  app.post('/orgs', register);
  app.put('/orgs', register);
  app.patch('/orgs', register);
  app.delete('/orgs', register);

  // app.get('/pets', registerPets);
  app.post('/pets', registerPets);
  // app.put('/pets', registerPets);
  // app.patch('/pets', registerPets);
  // app.delete('/pets', registerPets);

  app.post('/me', registerPets);
  app.post('/sessions', authenticate);
}
