const db = require('../database/db-config.js');

module.exports = {
    findById,
    add,
    find,
    check
}

function find() {
    return db('users_vacation as uv')
        .join('users as u', 'uv.user_id', 'u.id')
        .join('vacations as v', 'uv.vacation_id', 'v.id')
        .select('u.username', 'v.id as vacation_id', 'v.title', 'v.location', 'v.dates', 'v.description', 'uv.notes' );
        
}

function findById(id) {
    return db('users_vacation').where({ id }).first();
}

async function add(userId, vacationId) {
    const [id] = await db('users_vacation').insert({user_id: userId , vacation_id: vacationId});
    return findById(id)
}

function check(userId, vacId) {
    return db('users_vacation').where('user_id',userId).andWhere('vacation_id',vacId)
    .then(link => {
        if(!link.length) {
            return false
        } else {
            return true
        }
    });
};
