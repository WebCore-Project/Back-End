const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    update,
    findById,
    remove
};

function findById(id) {
    return db('vacations').where({ id }).first();
}

async function add(vac) {
    const [id] = await db('vacations').insert(vac, 'id');
    return findById(id)
};

function find() {
    return db('vacations')
}

function update(vacId, change) {
    return db('vacations').where({ 'id': vacId }).update(change)
}

function remove(vacId) {
    // const deletedVac = await db('vacations').where({id: vacId}).del();
    // const deletedLink = await db('users_vacation').where({ 'vacation_id': vacId }).del();
    // return deletedVac;

    return db('vacations').where({'id': vacId}).del().then(deleted => {
        if(deleted) {
            db('users_vacation').where({ 'vacation_id': vacId }).del();
            return deleted;
        } else {
            return deleted;
        }
    })
}