import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";
import { feedController } from "../controllers/feedController";

export async function routes(app: FastifyInstance) {
  app.register(userController, { prefix: "/user" });
  app.register(feedController, { prefix: "/feed" });
}
