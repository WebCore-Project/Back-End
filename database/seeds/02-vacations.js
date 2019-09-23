
exports.seed = function(knex, Promise) {
    return knex('users').insert([
      { title: 'test', location: 'paris'}   
    ]);
  };
  