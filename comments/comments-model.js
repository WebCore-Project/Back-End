const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    remove,
    update,
    findById,
}

function findById(id) {
    return db('vacation_comments').where({id}).select('comments')
}

async function add(userId, vacationId, comment) {
    const [id] = await db('vacation_comments').insert({user_id: userId , vacation_id: vacationId, comments: comment}, 'id');
    return findById(id)
}

function find(vacId) {
    return db('vacation_comments as vc')
            .join('users as u', 'vc.user_id', 'u.id')
            .where({'vc.vacation_id': vacId})
            .select('u.username as commenter', 'vc.id', 'vc.vacation_id', 'vc.comments', 'vc.created_at', 'vc.updated_at')
};

function remove(comId, vacId) {
    return db('vacation_comments').where({'id': comId}).andWhere({'vacation_id': vacId}).del()
};

function update() {

};