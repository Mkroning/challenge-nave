exports.up = (knex) =>
  knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('name').notNullable();

    table.integer('user_id').notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('projects');
