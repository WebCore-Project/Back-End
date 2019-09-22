const db = require('../database/db-config.js');

module.exports = {
    find,
    add,
    findBy,
    findById,
    findIdFromName
};

function find() {
    return db('users').select('id', 'username', 'password');
};

function findBy(filter) {
    return db('users').where(filter).first();
};

function findById(id) {
    return db('users').where({ id }).first();
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

async function findIdFromName(username) {
    const {id} = await db('users').where("username", username).select('id').first();
    console.log('here',id)
    return id;
}
