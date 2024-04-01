import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

/* 
an array of route: all routes
each route will be an object
property: path || url
handler ==> response if the route is requested
*/

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { search } = request.query

      // sending of an object
      const users = database.select("users", search ? {
        name: search,
        email: search,
      } : null);

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
    /* 
    route parameter identified with two dots: ":"    
    if receive more of an route parameters: rename for "groups"
    */
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      database.delete("users", id)
      // console.log(request.params)
      return response.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;

      // qual tabela? qual id? ...informações atualizadas: name && email
      database.update("users", id, {
        name, email,
      })

      return response.writeHead(204).end();
    },
  }
]