
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
            .inTable('vacations');
        tbl.text('notes', 1024);    
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
            .inTable('vacations');
        tbl.text('comments', 1024);
        tbl.timestamps(true);
    });
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('vacation_comments')
        .dropTableIfExists('users_vacation')
        .dropTableIfExists('vacations')
        .dropTableIfExists('users');
};
