exports.seed = function(knex, Promise) {
    return knex('vacation_comments').insert([
        {user_id: 1, vacation_id: 1, comments: "Hey, are you free to join this trip?"},
        {user_id: 2, vacation_id: 2, comments: "We should see some monuments!"},
        {user_id: 3, vacation_id: 3, comments: "Can we change the date, please? I am not free those days!"}
    ]);
};