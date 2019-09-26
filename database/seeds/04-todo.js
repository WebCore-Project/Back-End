exports.seed = function(knex, Promise) {
    return knex('todo').insert([
        {user_id: 1, vacation_id: 1, suggestion: "Go to the beach and serf"},
        {user_id: 2, vacation_id: 2, suggestion: "visit the White House"},
        {user_id: 3, vacation_id: 3, suggestion: "Eat some sea food"}
    ]);
};