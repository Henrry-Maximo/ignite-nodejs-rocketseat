import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { registerPets } from "./controllers/register-pets";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/pets", registerPets);

  app.post("/me", registerPets);

  /*
    * não utilizar verbo, mas sim, semântico.
    * authenticate -> sessions.
  */
  app.post("/sessions", authenticate);
}
