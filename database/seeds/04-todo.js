exports.seed = function(knex, Promise) {
    return knex('todo').insert([
        {id: 1, user_id: 1, vacation_id: 1, list: "Go to the beach and serf"},
        {id: 2, user_id: 2, vacation_id: 2, list: "visit the White House"},
        {id: 3, user_id: 3, vacation_id: 3, list: "Eat some sea food"}
    ]);
};