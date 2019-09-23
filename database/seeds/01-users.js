
exports.seed = function(knex, Promise) {
    return knex('users').insert([
      { username: 'Rae', password: 'pass1'}   
    ]);
  };
  