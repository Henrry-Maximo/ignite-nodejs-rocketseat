import http from "node:http";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

    // utilizar método find para encontrar rotas, verificadndo method and path
    const route = routes.find((route) => {
      return route.method === method & route.path === url;
    });
    
    console.log(route);
});

server.listen(9090);