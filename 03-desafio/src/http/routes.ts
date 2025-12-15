import { FastifyInstance } from 'fastify';

import { search as searchOrgs } from './controllers/orgs/search';
import { register as registerOrgs } from './controllers/orgs/register';

import { search as searchPets } from './controllers/pets/search';
import { register as registerPets } from './controllers/pets/register';

import { authenticate } from './controllers/orgs/authenticate';
import { profile } from './controllers/orgs/profile';
import { verifyJWT } from './middlewares/verify-jwt';
import { handle } from './controllers/pets/contact-org';
import { deletePets } from './controllers/pets/delete';

export async function appRoutes(app: FastifyInstance) {
  app.get('/orgs', searchOrgs);
  app.post('/orgs', registerOrgs);

  app.get('/pets', searchPets);
  app.post('/pets', { onRequest: [verifyJWT] }, registerPets);
  app.get('/pets/:petId/contact', handle);
  app.delete('/pets/:id', { onRequest: [verifyJWT] }, deletePets);

  app.post('/me', { onRequest: [verifyJWT] }, profile); 
  app.post('/sessions', authenticate);

  // app.put('/orgs', register);
  // app.patch('/orgs', register);
  // app.delete('/orgs', register);
  // app.put('/pets', registerPets);
  // app.patch('/pets', registerPets);
  // app.delete('/pets', registerPets);
}
