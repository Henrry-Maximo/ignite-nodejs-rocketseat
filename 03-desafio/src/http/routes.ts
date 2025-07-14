import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", register);

  /*
    * não utilizar verbo, mas sim, semântico.
    * authenticate -> sessions.
  */
  app.post("/sessions", authenticate);
}
