import { expect, test, beforeAll, afterAll } from "vitest";

// typescript: supertest for construída em js / DT = mantido pela comunidade
// npm i --save-dev @types/supertest
import request from "supertest";
// importar = vai tentar subir um servidor na porta 3333
// separar inicialização/recursos do servidor
import { app } from "../src/app";

// import { createServer } from 'node:http'
// servidor nodejs: puro (const server = createServer())
// por baixo de um framework, sempre está rodando um servidor (muda de um para outro o jeito de acessar)

// obs.: ao utilizar testes, é importantes garantir que todas as rotas foram executadas

// executar este código antes dos testes / vai executar somente uma vez
// se tiver mais que um teste, utilizar "beforeEach", pois assim será executada para cada um.
// afterAll / afterEach
beforeAll(async () => {
  // aguardar que meu app esteja pronto (terminar de cadastrar os plugins)
  await app.ready();
})

afterAll(async () => {
  // aguardar que tenha realizado todos os testes para fechar (aplicação)
  await app.close();
})

// variáveis importantes: enunciado / operação / validação
test("o usuário consegue criar uma nova transação", async () => {
  // servidor do nodejs
  await request(app.server)
    .post("/transactions")
    .send({ title: "New transaction", amount: 5000, type: "credit" }).expect(201)

  // espero que status code seja igual à 201:
  // expect(response.statusCode).toEqual(201)
  // alternativa de código: colocar o expect no final do send

  // fazer a chamada HTTP p/ criar uma nova transação
  // const responseStatusCode = 201

  // validação / quais expects eu vou fazer?
  // expect(responseStatusCode).toEqual(201);
});

// iniciar teste:
// - npx vitest
// obs.: para não ficar tendo que digitar, usar "test": "vitest" no package.json
