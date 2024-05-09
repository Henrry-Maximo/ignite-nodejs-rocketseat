import fastify, { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

// todo plugin do fastify, obrigatoriamente, precisa ser uma função assíncrona (await)
// funcionalidade de plugins

// marcação em app: específicar o formato / inferir automaticamente
export async function transactionsRoutes(app: FastifyInstance) {
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

  app.get("/", async (req, reply) => {
    const transactions = await knex('transactions').select('*')

    return transactions;
  })

  // rota para criação de uma nova transaction
  app.post("/", async (req, reply) => {
    // request.body: de onde o valor vem
    // req. => armazena dezenas de informações

    // obs.: req.body = objeto
    const createTransacationBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']), // enum => um dos dois
    }); 

    const { title, amount, type } = createTransacationBodySchema.parse(req.body);
    // obs.: possível desestruturação

    // alternativa => importar somente o módulo:
    // import { randomUUID } from  "crypto"
    // ou => import crypto from "crypto" = id: crypto.randomUUID()
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      // amount => debito = valor negativo / facilitar a soma (overview)
      amount: type === 'credit' ? amount : amount * -1,
    })
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
