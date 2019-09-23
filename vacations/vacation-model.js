const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    update,
    findById
};

function findById(id) {
    return db('vacations').where({id}).first();
}

async function add(vac) {
    const [id] = await db('vacations').insert(vac, 'id');
    return findById(id)
};

function find(){
    return db('vacations')
}

function update(vacId, change) {
    return db('vacations').where({'id': vacId}).update(change)
}