const bcrypt = require('bcryptjs');
exports.seed = async function(knex, Promise) { 
    const hash1 = await bcrypt.hashSync("bluefire", 12);
    const hash2 = await bcrypt.hashSync("greenfire", 12);
    const hash3 = await bcrypt.hashSync("redfire", 12);
    return knex('users').insert([
        {id: 1, username: "blue", password: hash1},
        {id: 2, username: "green", password: hash2},
        {id: 3, username: "red", password: hash3},
    ]);
};

