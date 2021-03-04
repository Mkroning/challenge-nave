exports.up = (knex) =>
  knex.schema.createTable('project_naver', (table) => {
    table.increments('id');

    table.integer('project_id').notNullable();
    table.integer('naver_id').notNullable();

    table
      .foreign('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE');
    table
      .foreign('naver_id')
      .references('id')
      .inTable('navers')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('project_naver');
