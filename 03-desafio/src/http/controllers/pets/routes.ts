import type { FastifyInstance } from "fastify";

import { register } from "./register";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", register)
}
