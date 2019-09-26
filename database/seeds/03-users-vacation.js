exports.seed = function(knex, Promise) {
    return knex('users_vacation').insert([
        {user_id: 1, vacation_id: 1},
        {user_id: 2, vacation_id: 2},
        {user_id: 3, vacation_id: 3}
    ]);
};