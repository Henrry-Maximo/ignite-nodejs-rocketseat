import { randomUUID } from "crypto";
import { Database } from "./database.js"

const db = new Database;

export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (request, response) => {
      const { title, description } = request.body
      const task = { id: randomUUID(), title, description };

      db.insert("tasks", task);
      return response.writeHead(201).end();
    }
  },
]
