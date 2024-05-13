import fastify from "fastify";
import { app } from './app'

// módulo interno
import crypto from 'node:crypto';
import cookie from '@fastify/cookie';

import { knex } from "./database";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

// base of application
// const app = fastify();

// antes das rotas / cadastro precisa acontecer antes de inicializar as rotas
// app.register(cookie);

// obs.: ordem que o fastify vai executar / ordem correta
// segundo parâmetro: configuração
// prefix => todas as rotas que comerarem com 'transactions' vai cair no plugin
// app.register(transactionsRoutes, {
//   prefix: 'transactions'
// });

// GET, POST, PUT, PATCH, DELETE
// http://localhost:333/hello

// app.get("/hello", async () => {
  // const tables = await knex("sqlite_schema").select("*");
  // return tables;

  // inserindo uma nova transação (inserção da transaction):
  // const transaction = await knex('transactions').insert({
  //   id: crypto.randomUUID(),
  //   title: 'Transação de teste',
  //   amount: 1000,
  // }).returning('*');

  // Ex.: INSERT () VALUES () RETURNING

  // realizar uma busca de todas as transações:
  // const transactions = await knex('transactions').select('*');

  // realizar uma busca de transações com where (onde?):
  // const transactions = await knex('transactions').where('amount', 500).select('*');

  // return transactions;
// });

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running: ${env.PORT}`);
  });
