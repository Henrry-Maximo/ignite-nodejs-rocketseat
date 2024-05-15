// working with sqlite3 using knex
import 'dotenv/config'; // ler o arquivo .env (valores em process.env - variável global)
import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';

// se process.env.DATABASE_URL não existe: dá erro e finaliza
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL env not found.");
// }

// importar interface > definir formato

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    // se for declarado, mas não usado (undefined), dará erro;
    // zod => env: tipado (todas as variáveis)
    filename: env.DATABASE_URL,
  },
  // aplicar nas tabelas
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
}

export const knex = setupKnex(config);
