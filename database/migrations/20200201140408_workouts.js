
exports.up = function(knex) {
  return knex.schema.createTable('workouts', table => {
      table.increments();
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('name', 128)
        .notNullable();
      table.integer('reps');
      table.integer('weight');
      table.string('body_region');
      table.timestamp('date')
        .notNullable()
        .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('workouts');
};
