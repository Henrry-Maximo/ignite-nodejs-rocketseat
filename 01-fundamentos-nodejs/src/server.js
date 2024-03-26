import http from "node:http";
import { json } from "./middlewares/json.js";

const server = http.createServer( async (request, response) => {
  const { method, url } = request;
  await json(request, response)
  
  
  return response.writeHead(404).end();
});

server.listen(4444);

