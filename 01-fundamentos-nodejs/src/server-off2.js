import http from "node:http";
// UUID => Unique Universal ID
import { randomUUID } from 'node:crypto'
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
// quando se está trabalhando com type module, 
// precisa específicar a extensão do arquivo nas exportações

// const users = [];
// const database = new Database();

const server = http.createServer( async (request, response) => {
  const { method, url } = request;

  // middleware = interceptar a requisição
  // Funções que interceptam e manipulam a requisição e a resposta de uma rota
  // é necessário aguardar a resposta para prosseguir (await)
  await json(request, response)
  
  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
   try {
    const { name, email } = request.body;

    // Math.random (números aleatórios) => não é legal
    // Short Unique Id
    // Utilizando randomUUID, pois é nativo do NodeJS.
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

