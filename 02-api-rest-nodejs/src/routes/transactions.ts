import fastify, { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import { request } from "http";

// todo plugin do fastify, obrigatoriamente, precisa ser uma função assíncrona (await)
// funcionalidade de plugins

// marcação em app: específicar o formato / inferir automaticamente
export async function transactionsRoutes(app: FastifyInstance) {

  // middlewares globaias
  // declaração do Handler Global / só serve para este plugin
  app.addHook('preHandler', async (req, reply) => {
    console.log(`[${req.method}], ${req.url}`)
  })


  // app.get("/hello", async () => {
  //   const transactions = await knex("transactions")
  //     .where("amount", 500)
  //     .select("*");

  //   return transactions;
  // });

  // listar todas as transactions:
  // app.get('/transact')

  // listar uma única transaction
  // app.get('/transact/:id')

  // segundo parâmetro: configuração
  // preHandler - executa antes do handler (funcionamento da rota)
  // lógica: estabelecer em várias rotas, executa antes e verifica se existi
  app.get("/", { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    // utilizar cookie para buscar somente as transações do usuário que fez o envio
    const { sessionId } = req.cookies;

    // if (!sessionId) {
    //   return reply.status(401).send({ error: "Unauthorizad" });
    // }

    // buscar todos os dados
    // const transactions = await knex("transactions").select("*");

    // buscar dados do usuário que tem cookie associado
    const transactions = await knex("transactions")
      .where("session_id", sessionId)
      .select("*");

    // evitar envar direto o array, pois se um dia quiseres retornar mais um dado
    // vai ser difícil, porque não há onde inserir a informação

    // fazer o envio como um objeto, entre {}. Assim, é possível manipular para
    // inserir um novo registro, além de manter a estrutura, evitando problema no front.

    // objeto => envio/retorno

    return { total: 200, transactions };
  });

  // resumo da conta do usuário
  app.get("/summary", async (req, reply) => {
    const { sessionId } = req.cookies

    // buscar as transações onde a transação tenha o mesmo sessionId dos Cookies
    // e somar todos os valores de amount
    const summary = await knex("transactions").where('sessionId', sessionId)
    .sum("amount", { as: "amount" })
      .first();

    return { summary };
  });

  // receber um parâmetro da minha rota
  // ex.: http://localhost:3333/transactions/sadasd-123123as-asdas-12312

  // request => params (parâmetros renomeados)
  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    // z.object => espera receber um objecto
    const getTransactionsParamsSchema = z.object({
      // O Zod permite realizar a verificação do id (Universe Unique Id)
      id: z.string().uuid(),
    });

    // parse: validando e transformando os dados da requisição (formato)
    // se quiseres, pode desestruturar
    const { id } = getTransactionsParamsSchema.parse(req.params);

    const { sessionId } = req.cookies;

    // buscar uma única transação:
    // método first() = só vai ter um resulado, pois queremos apenas uma transação
    // const transaction = await knex("transactions").where("id", id).andWhere('session_id', sessionId).first();
    const transaction = await knex("transactions").where({ session_id: sessionId, id }).first();

    return { transaction };
  });

  // rota para criação de uma nova transaction
  app.post("/", async (req, reply) => {
    // request.body: de onde o valor vem
    // req. => armazena dezenas de informações

    // obs.: req.body = objeto
    const createTransacationBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]), // enum => um dos dois
    });

    const { title, amount, type } = createTransacationBodySchema.parse(
      req.body
    );
    // obs.: possível desestruturação

    // procurando dentro dos cookies (metadados) se já existe, se existir, é só inserir
    let sessionId = req.cookies.sessionId;

    // porém, se não existir
    if (!sessionId) {
      sessionId = randomUUID();

      // salvar no cookie o id criado / possível passar configurações
      reply.cookie("sessionId", sessionId, {
        path: "/",
        // primeira dica: não colocar um número gigante pela calculadora (ninguém vai entender)
        maxAge: 60 * 60 * 24 * 7, // segunda dica: 7 days - colocar um comentário (clean code)
        // expires: new Date('2023-12-01T08:00:00') - CHATO!
      });
    }

    // alternativa => importar somente o módulo:
    // import { randomUUID } from  "crypto"
    // ou => import crypto from "crypto" = id: crypto.randomUUID()
    await knex("transactions").insert({
      id: randomUUID(),
      title,
      // amount => debito = valor negativo / facilitar a soma (overview)
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });
    // returning => geralmenta não utilizado em rotas de criação

    // HTTP Codes () => Simbolizam o tipo de retorno que estou tendo da api
    // 201 - Recurso Criado com Sucesso
    // reply || response

    // title, amount, type: credit ou debit
    // aqui entra o pula do gato, utilizando o zod
    // zod => validar o body && estabelecer formato
    // const {} = req.body;

    // express => response
    // resposta vazia

    // Query Builders limitação => ele não sugere os campos existentes no bd
    return reply.status(201).send();
  });
}
