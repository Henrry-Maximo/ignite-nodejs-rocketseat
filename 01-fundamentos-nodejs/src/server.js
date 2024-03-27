import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  // Query Parameters: URL Stateful ==> Filtros, paginação, não-obrigatórios (informações não sensíveis - modificam a resposta)
  // Route Parameters: identificação de recurso
  // Request Body: Envio de informações de um formulário (os dados passam pelo protocolo HTTPs)
  // Já estamos usando na hora de inserir o usuário

  // parâmetros renomeados que enviamos na requisição | chave e valor, para mais parâmetros, utilizar: &
  // http://localhost:3333/users?userId=1

  // O método HTTP diz o que o route parameters significa
  // GET http://localhost:333/users/1

  // Request Body (o corpo da requisição é enviado à parte):
  // POST http://localhost:33/users

  // Edição e remoção: Usuário

  // Base de Rotas
  // encontrar uma rota aonde o método seja igual ao método que esteja sendo requisitado
  // e que o path também seja igual a url que está sendo requisitada
  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    return route.handler(request, response);
  }

  console.log(route);

  return response.writeHead(404).end();
});

server.listen(4444);
