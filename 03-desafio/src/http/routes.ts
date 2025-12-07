import { FastifyInstance } from 'fastify';
import { search } from './controllers/orgs/search';
import { authenticate } from './controllers/users/authenticate';
import { registerPets } from './controllers/users/register-pets';

export async function appRoutes(app: FastifyInstance) {
  app.get('/orgs', search);
  // app.post('/orgs', register);
  // app.put('/orgs', register);
  // app.patch('/orgs', register);
  // app.delete('/orgs', register);

  // app.get('/pets', registerPets);
  app.post('/pets', registerPets);
  // app.put('/pets', registerPets);
  // app.patch('/pets', registerPets);
  // app.delete('/pets', registerPets);

  app.post('/me', registerPets);
  app.post('/sessions', authenticate);
}
