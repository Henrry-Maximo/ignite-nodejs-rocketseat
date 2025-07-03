import fastify from "fastify";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify();

app.register(petsRoutes);