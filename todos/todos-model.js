const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    remove,
    update,
    findById,
}

function findById(id) {
    return db('todo').where({id}).select('list')
}

async function add(userId, vacationId, todo) {
    const [id] = await db('todo').insert({user_id: userId , vacation_id: vacationId, list: todo}, 'id');
    return findById(id)
}

function find(vacId) {
    return db('todo as t')
            .join('users as u', 't.user_id', 'u.id')
            .where({'t.vacation_id': vacId})
            .select('u.username as suggestor', 't.id', 't.vacation_id', 't.created_at', 't.updated_at', 't.list')
};

function remove(comId, vacId) {
    return db('todo').where({'id': comId}).andWhere({'vacation_id': vacId}).del()
};

function update() {

};