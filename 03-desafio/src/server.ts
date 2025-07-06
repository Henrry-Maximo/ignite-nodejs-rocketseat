import { app } from "./app";
import { env } from "./env";

/*
  host: "0.0.0.0": acessível para qualquer aplicação
*/

app.listen({
  host: "0.0.0.0",
  port: env.PORT,
}).then(() => {
  console.log("🚀 HTTP Server Running!");
});
