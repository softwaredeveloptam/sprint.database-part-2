exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("user_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("from_id") // maximum length of 15 characters
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.integer("to_id")
      .notNullable()
      .index();

    t.string("message", 10000).notNullable();

    t.string("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("user_messages");
};
