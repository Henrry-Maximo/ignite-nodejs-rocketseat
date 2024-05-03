import fastify from "fastify";
import { knex } from "./database";
import { table } from "console";

// base of application
const app = fastify();

// GET, POST, PUT, PATCH, DELETE
// http://localhost:333/hello

app.get("/hello", async () => {
  const tables = await knex("sqlite_schema").select("*");

  return tables;
});

app
  .listen({
    port: 3331,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
