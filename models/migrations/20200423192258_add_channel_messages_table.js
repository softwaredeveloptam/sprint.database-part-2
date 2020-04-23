exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("channel_id", 15) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.string("from_id", 15)
      .unique()
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
  return knex.schema.dropTable("channel_messages");
};
