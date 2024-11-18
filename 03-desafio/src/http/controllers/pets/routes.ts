import type { FastifyInstance } from "fastify";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", register)
}
