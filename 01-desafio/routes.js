import { randomUUID } from "crypto";
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database;

function formatDate(date = new Date(), format = "dd/mm/aaaa") {
  const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      aa: date.getFullYear().toString().slice(-2),
      aaaa: date.getFullYear()
  }

  return format.replace(/mm|dd|aa|aaaa/gi, matched => map[matched])
}

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (request, response) => {
      console.log(request.query)
      const task = db.select("tasks");

      return response.end(JSON.stringify(task));
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (request, response) => {
      const { title, description } = request.body
      const completed_at = null;
      const updated_at = null;
      const created_at = formatDate();
      const task = { id: randomUUID(), title, description, completed_at, created_at, updated_at};

      db.insert("tasks", task);
      return response.writeHead(201).end();
    }
  },
]
