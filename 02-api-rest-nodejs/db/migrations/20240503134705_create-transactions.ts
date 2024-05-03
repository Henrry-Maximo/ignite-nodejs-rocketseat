import { Knex } from "knex";

// up: fez.
// O que essa migrations vai fazer no banco de dados?
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    // criar id como integer, mas a recomendação é utilizar valor aleatório
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

// down: desfaz.
// cara, deu merda!
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

