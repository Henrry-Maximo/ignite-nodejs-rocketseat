import { app } from "./app";

app.listen(
  { 
    port: 3334 
  }
  ).then(() => {
  console.log("Servidor Iniciado!");
});
