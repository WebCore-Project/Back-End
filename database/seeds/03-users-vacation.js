exports.seed = function(knex, Promise) {
    return knex('users_vacation').insert([
        {id: 1, user_id: 1, vacation_id: 1},
        {id: 2, user_id: 2, vacation_id: 2},
        {id: 3, user_id: 3, vacation_id: 3}
    ]);
};