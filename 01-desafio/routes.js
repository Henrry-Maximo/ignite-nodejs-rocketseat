import { randomUUID } from "crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const db = new Database();

function taskDateFormatted() {
  let date = new Date();
  let taskDateTodayFormatted = format(date, "dd 'de' LLLL 'de' y 'às' HH:mm'h'", {
    locale: ptBR,
  });
  return taskDateTodayFormatted;
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
      const updated_at = taskDateFormatted();
      const created_at = taskDateFormatted();
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at,
        updated_at,
      };

      db.insert("tasks", task);

      return response
        .writeHead(201)
        .end(JSON.stringify({ msg: "Tarefa inserida com sucesso" }));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      //validação se o id pertence a uma task salva no banco de dados.
      const [task] = db.select("tasks", { id });
      if (!task) {
        return response
          .writeHead(404)
          .end(JSON.stringify({ msg: "id não encontrado" }));
      }

      db.delete("tasks", id);

      return response
        .writeHead(200)
        .end(JSON.stringify({ msg: "task deletada com sucesso" }));
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
        return response
          .writeHead(400)
          .end(JSON.stringify({ msg: "falta parâmetro, título ou descrição" }));
      }

      //validação se o id pertence a uma task salva no banco de dados.
      const [task] = db.select("tasks", { id });
      // responder case task não seja encontrada
      if (!task) {
        return response
          .writeHead(404)
          .end(JSON.stringify({ msg: "task não encontrada" }));
      }

      // chave: valor (body) e valor (select)
      // operador de coalescência
      db.update("tasks", id, { ...task,
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: taskDateFormatted(),
      });

      return response
        .writeHead(200)
        .end(JSON.stringify({ msg: "atualizado com sucesso" }));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;

      //validação se o id pertence a uma task salva no banco de dados.
      const [task] = db.select("tasks", { id });
      if (!task) {
        return response
          .writeHead(404)
          .end(JSON.stringify({ msg: "id não encontrado" }));
      }

      // capturar valor booleano: "completed_at"
      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : taskDateFormatted();

      db.update("tasks", id, { ...task, completed_at });

      return response.writeHead(204).end();
    },
  },
];
