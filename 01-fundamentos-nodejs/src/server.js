import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

/*
  Query Parameters (URL Stateful): Filtros, paginação, não-obrigatórios (informações não sensíveis)
  Route Parameters: Identificação de recurso
  Request Body: Envio de informações de um formulário (os dados passam pelo protocolo HTTPs)
  Já estamos usando na hora de inserir o usuário

  parâmetros renomeados que enviamos na requisição | chave e valor, para mais parâmetros, utilizar: &
  http://localhost:3333/users?userId=1

  O método HTTP diz o que o route parameters significa
  GET http://localhost:333/users/1

  Request Body (o corpo da requisição é enviado à parte):
  POST http://localhost:33/users

  Edição e remoção: Usuário
*/

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);
  /*
  Base de Rotas:
  encontrar uma rota aonde o método 
  seja igual ao método que esteja 
  sendo requisitado e que o path 
  também seja igual a url que está 
  sendo requisitada
  */
  
  // utilizar método find para encontrar rotas, verificadndo method and path
  const route = routes.find((route) => {
    // regex: há um método test - verificar o valor (booleano)
    return route.method === method && route.path.test(url);
  });

  // encontrou a rota?
  if (route) {
    // quais foram os dados encontrados?
    const routeParams = request.url.match(route.path);
    // console.log(extractQueryParams(routeParams.groups.query));
    const { query, ...params } = routeParams.groups

    request.params = params
    request.query = query ? (extractQueryParams(query)) : {}

    // somente key e value de determinada propriedade
    // request.params = { ...routeParams.groups}

    return route.handler(request, response);
  }

  console.log(route);
  return response.writeHead(404).end();
});

server.listen(4444);
