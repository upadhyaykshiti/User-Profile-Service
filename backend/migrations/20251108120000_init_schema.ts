import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('email').notNullable().unique();
    t.string('password').notNullable();
    t.string('firstName');
    t.string('lastName');
    t.timestamps(true, true);
  });

  await knex.schema.createTable('audit_logs', (t) => {
    t.increments('id').primary();
    t.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
    t.string('action').notNullable();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });

  // index for performance
  await knex.schema.alterTable('audit_logs', (t) => {
    t.index(['userId', 'createdAt'], 'idx_audit_user_created');
  });

  await knex.schema.alterTable("users", (t) => {
  t.index("email", "idx_users_email");
  });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('audit_logs');
  await knex.schema.dropTableIfExists('users');
}
