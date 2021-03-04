exports.up = (knex) =>
  knex.schema.createTable('navers', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.date('birthdate').notNullable();
    table.date('admissionDate').notNullable();
    table.string('jobRole').notNullable();

    table.integer('user_id').notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('navers');
