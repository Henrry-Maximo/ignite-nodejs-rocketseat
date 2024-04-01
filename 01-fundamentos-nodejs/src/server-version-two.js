import http from "node:http";
import { randomUUID } from 'node:crypto'; // UUID => Unique Universal ID
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

/* 
when working with type module,
need to specify the file extension in exports
*/

// const users = [];
// const database = new Database();

const server = http.createServer( async (request, response) => {
  const { method, url } = request;

  // using "await" to wait for the response
  await json(request, response) // middleware = intercept a request/response of an route
  
  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
   try {
    const { name, email } = request.body;

    /*
    Math.random (numbers random) ==> not is cool
    Using randomUUID, because is native of NodeJS (Short-Unique-Id)
    */

    const user = { id: randomUUID(), name, email };
    database.insert("users", user)

    return response.writeHead(201).end();
   } catch {
    console.log("Sem dados disponíveis.")
    return response.writeHead(400).end();
    // return res.writeHead(404).end('Defina uma rota de URL!')
   }
  }
  return response.writeHead(404).end();
});

server.listen(4444);

