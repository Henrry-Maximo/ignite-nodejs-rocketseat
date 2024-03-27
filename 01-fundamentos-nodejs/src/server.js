import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  // Query Parameters: URL Stateful ==> Filtros, paginação, não-obrigatórios (informações nã sensíveis)
  // Route Parameters:
  // Request Body:

  // parâmetros renomeados que enviamos na requisição | chave e valor, para mais parâmetros, utilizar: &
  // http://localhost:3333/users?userId=1

  // identificação de recurso
  // GET http://localhost:333/users/1

  // Base de Rotas
  // encontrar uma rota aonde o método seja igual ao método que esteja sendo requisitado
  // e que o path também seja igual a url que está sendo requisitada
  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(request, response);
  }

  console.log(route);

  return response.writeHead(404).end();
});

server.listen(4444);
