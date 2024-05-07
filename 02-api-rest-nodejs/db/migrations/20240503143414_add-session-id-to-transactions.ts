import type { Knex } from "knex";

// migration => inserir novo campo na migration: transactions
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    // index: criar cache de session_id / muito pesquisado
    // utilizando "after" para posicionar nova coluna / obs.: alguns bancos suportam
    table.uuid('session_id').after('id').index()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}

