const bcrypt = require('bcryptjs');
exports.seed = async function(knex, Promise) { 
    const hash1 = await bcrypt.hashSync("bluefire", 12);
    const hash2 = await bcrypt.hashSync("greenfire", 12);
    const hash3 = await bcrypt.hashSync("redfire", 12);
    return knex('users').insert([
        {username: "blue", password: hash1},
        {username: "green", password: hash2},
        {username: "red", password: hash3},
    ]);
};

