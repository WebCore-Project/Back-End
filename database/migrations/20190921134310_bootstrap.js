
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();

        tbl
            .string('username', 255)
            .notNullable()
            .unique()
        tbl
            .string('password', 255).notNullable();
    })
    .createTable('vacations', tbl => {
        tbl.increments();
        tbl.string('location', 512).notNullable();
        tbl.string('title', 512).notNullable();
        tbl.string('dates', 128);
        tbl.text('description', 1024);
    })
    .createTable('users_vacation', tbl => {
        tbl.increments('id');
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');
        tbl.integer('vacation_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('vacations')
            .onDelete('CASCADE');
        tbl.text('notes', 1024);   
    })
    .createTable('todo', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');
        tbl.integer('vacation_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('vacations')
            .onDelete('CASCADE');
        tbl.text('suggestion', 5000).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable('vacation_comments', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');
        tbl.integer('vacation_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('vacations')
            .onDelete('CASCADE')
        tbl.text('comments', 5000).notNullable();
        tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('vacation_comments')
        .dropTableIfExists('todo')
        .dropTableIfExists('users_vacation')
        .dropTableIfExists('vacations')
        .dropTableIfExists('users');
};
