import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('daily_users', (table) => {
    table.uuid('session_id').after('id').index()
    table.string('email').after('password')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('daily_users', (table) => {
    table.dropColumn('session_id')
    table.dropColumn('email')
  })
}
