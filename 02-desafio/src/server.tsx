import fastify from "fastify";

export const app = fastify();
import { userRoutes } from "./routes/user"

app.register(userRoutes, {
  prefix: "user"
})

app.listen(
  { 
    port: 3334 
  }
  ).then(() => {
  console.log("servidor iniciado!");
});
