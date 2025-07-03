import http from "http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// req ==> ReadableStream
// res ==> WritableStream 

// server startup 
const server = http.createServer( async (request, response) => {
    // ler todos os dados da stream para manipular:
    const buffers = [];
    // pedacinhos que vai receber da stream
    // percorrer e popular os buffers 
    // trabalhar com o array de forma completa.

    // async/await - promisses
    // aguarda cada pedaço da Stream ser retornado
    // percorrer os dados da requisição e inserir no buffers / nada será executado enquanto não terminar
    for await (const chunk of request) {
      buffers.push(chunk);
    } 

    // concat(): unir vários pedacinhos em vários pedaços
    const fullStreamContent  = Buffer.concat(buffers).toString();
    console.log(fullStreamContent); // 12345
    return response.end(fullStreamContent);

  // try {
  //   console.log("Server Running!")

  //   return request.pipe(new InverseNumberStream()).pipe(response);
  // } catch (err) {
  //   console.error("Server Not Start!")
  // }
});

server.listen(4444);