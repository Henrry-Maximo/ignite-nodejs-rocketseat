// working with sqlite3 using knex
import { knex as setupKnex, Knex } from 'knex'

// importar interface > definir formato

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
  // aplicar nas tabelas
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
}

export const knex = setupKnex(config);
