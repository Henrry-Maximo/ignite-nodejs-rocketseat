import {
  expect,
  test,
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  it,
} from "vitest";

// obter diferentes funções para executar scripts de forma paralela
import { execSync } from "node:child_process";

// typescript: supertest for construída em js / DT = mantido pela comunidade
// npm i --save-dev @types/supertest
import request from "supertest";
// importar = vai tentar subir um servidor na porta 3333
// separar inicialização/recursos do servidor
import { app } from "../src/app";

// contexto de execução dos testes
describe("Transactions routes", () => {
  beforeAll(async () => {
    // cenário (testes e2e): ambiente totalmente zerado (database)
    // ou seja, desfazer as migrations em cada teste e montar novamente
    // execSync('npm run knex migrate:latest');

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // iniciar as migrations para o banco teste.db
  beforeEach(() => {
    // para cada teste, apaga o banco e cria de novo
    execSync("npm run knex migrate:rollback --all");

    // comandos do terminal dentro da aplicação
    execSync("npm run knex migrate:latest");
  });

  // Ex.: e2e => amigo => poucos e bons
  // Observação: um teste pode influenciar o outro

  // deve...
  it("should be able to create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({ title: "New transaction", amount: 5000, type: "credit" })
      .expect(201);

    // pegar o sessionId:

    // forma numero one:
    // console.log(response.headers);
    // forma numero two:
    // console.log("Set-Cookie");

    // regra (importante): jamais se pode escrever um teste que depende de outro teste
    // abster-se de qualquer contexto.
  });

  // funções do it
  // it.skip - pular teste
  // it.todo - lembrar de fazer o teste no futuro
  // it.only - somente aquele teste

  it("should be able list all the transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({ title: "New transaction", amount: 5000, type: "credit" });
    // se cookies estiver vazio, retornar um array vazio
    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    // sessionId:
    console.log(cookies);

    // nova requisição / rota de listagem / set: enviar um cookie (passando o cookie)
    // informação retirada da documentação do supetest
    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    // retornar a transação criada
    // console.log(listTransactionsResponse.body);

    /*
    validar que o body está retornando os dados imaginados (transação criada acima esteja contida na lista de transações)
    espero que o corpo da minha requisição seja um json (uma transação com id do tipo string - espero que meu id seja qualquer string)
    */
    // expect(listTransactionsResponse.body).toEqual([
    //   {
    //     id: expect.any(String)
    //   }
    // ]);

    // forma two:
    // espero que tenha um obejto que contém os dados (title, amount)
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "New transaction",
        amount: 5000,
      }),
    ]);
  });

  // obter o id da transação
  // obs.: o meu teste tem que se adaptar ao código, não vice-versa.
  it("should be able to get a specific transaction", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({ title: "New transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "New transaction",
        amount: 5000,
      })
    );
  });

  // resumo das transações
  it("should be able to get he summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({ title: "Credit transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({ title: "Debit transaction", amount: 2000, type: "debit" });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({amount: 3000});
  });
});

// import { createServer } from 'node:http'
// servidor nodejs: puro (const server = createServer())
// por baixo de um framework, sempre está rodando um servidor (muda de um para outro o jeito de acessar)

// obs.: ao utilizar testes, é importantes garantir que todas as rotas foram executadas

// executar este código antes dos testes / vai executar somente uma vez
// se tiver mais que um teste, utilizar "beforeEach", pois assim será executada para cada um.
// afterAll / afterEach
// beforeAll(async () => {
// aguardar que meu app esteja pronto (terminar de cadastrar os plugins)
// await app.ready();
// })

// afterAll(async () => {
// aguardar que tenha realizado todos os testes para fechar (aplicação)
// await app.close();
// })

// variáveis importantes: enunciado / operação / validação
// test("o usuário consegue criar uma nova transação", async () => {
// servidor do nodejs
// await request(app.server)
// .post("/transactions")
// .send({ title: "New transaction", amount: 5000, type: "credit" }).expect(201)

// espero que status code seja igual à 201:
// expect(response.statusCode).toEqual(201)
// alternativa de código: colocar o expect no final do send

// fazer a chamada HTTP p/ criar uma nova transação
// const responseStatusCode = 201

// validação / quais expects eu vou fazer?
// expect(responseStatusCode).toEqual(201);
// });

// iniciar teste:
// - npx vitest
// obs.: para não ficar tendo que digitar, usar "test": "vitest" no package.json

// nomeação de arquivos:
// o título do teste, geralmente, enquadra-se com o que está tratando
// ex.: o arquivo atual é "example.spec.ts", mudar para "transacations...".

// todos os testes => categoria
// utilizar describe para categorizar
