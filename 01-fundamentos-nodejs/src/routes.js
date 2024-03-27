import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

// um array de rotas (todas as rotas)
// cada rota será um objeto
// path || url - caminho
// handler ==> o que vai acontecer caso a rota seja chamada
export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const users = database.select("users");

      return response.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { name, email } = request.body;
      const user = { id: randomUUID(), name, email };
  
      database.insert("users", user)
  
      return response.writeHead(201).end();
    }
  },
  {
    // identificar o parâmetro da rota com dois pontos (":")
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      return response.end()
    },
  }
]