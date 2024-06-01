import fastify from "fastify";
// módulo interno
import cookie from '@fastify/cookie';

import { transactionsRoutes } from "./routes/transactions";

// base of application
export const app = fastify();

app.register(cookie); 

app.register(transactionsRoutes, {
  prefix: 'transactions'
});
