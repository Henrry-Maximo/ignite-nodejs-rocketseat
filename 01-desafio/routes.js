import { randomUUID } from "crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database();

function formatDate(date = new Date(), format = "dd/mm/aaaa") {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    aa: date.getFullYear().toString().slice(-2),
    aaaa: date.getFullYear(),
  };

  return format.replace(/mm|dd|aa|aaaa/gi, (matched) => map[matched]);
}

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { search } = request.query;

      const task = db.select(
        "tasks",
        search ? { title: search, description: search } : null
      );

      return response.end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { title, description } = request.body;
      const completed_at = null;
      const updated_at = null;
      const created_at = formatDate();
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at,
        updated_at,
      };

      db.insert("tasks", task);
      return response.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      db.delete("tasks", id);

      return response.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      // qual task?
      const { id } = request.params;

      // qual dados serão atualizados?
      const { title, description } = request.body;

      // verificar se title e description foram retornados
      if (!title && !description) {
        return response.writeHead(400).end({ message: "título ou descrição são requisitados." })
      }

      // verificar se os dados já existem
      const [task] = db.select('tasks', { id })

      if (!task) {
        return response.writeHead(404).end({ message: "task não encontrada." }) 
      }


      // chave: valor (body) e valor (select)
      db.update("tasks", id, {
        title, description
      })

      return response.writeHead(204).end();
    },
  },
];
