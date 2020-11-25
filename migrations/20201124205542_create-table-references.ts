import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('references', (table) => {
    table.string('id').unique().primary().notNullable();
    table.string('description');
    table.string('citation').notNullable();
    table.string('bibtex').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('references');
}
