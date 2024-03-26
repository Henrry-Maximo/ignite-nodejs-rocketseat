import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'

const database = new Database();

// um array de rotas (todas as rotas)
// cada rota será um objeto
// path || url
export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = database.select("users");

      return response.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = request.body;
      const user = { id: randomUUID(), name, email };
  
      database.insert("users", user)
  
      return response.writeHead(201).end();
    }
  }
]