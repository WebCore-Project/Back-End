const db = require('../database/db-config.js');

module.exports = {
    findByVacId,
    add,
    findByName,
    check,
    remove
}

function findByName(username) {
    return db('vacations as v')
        .join('users_vacation as uv', 'uv.vacation_id', 'v.id')
        .join('users as u', 'uv.user_id', 'u.id')
        .select('v.title', 'v.id as vacation_id', 'v.location', 'v.dates', 'v.description', 'uv.notes')
        .where({ 'u.username': username })
}

function findByVacId(vacId) {
    return db('vacations as v')
        .join('users_vacation as uv', 'uv.vacation_id', 'v.id')
        .join('users as u', 'uv.user_id', 'u.id')
        .select('u.username', 'v.id as vacation_id', 'v.title', 'v.location', 'v.dates', 'v.description', 'uv.notes')
        .where({ 'v.id': vacId })
}

function findById(id) {
    return db('users_vacation').where({ id })
}

async function add(userId, vacationId) {
    const [id] = await db('users_vacation').insert({ user_id: userId, vacation_id: vacationId }, 'id');
    return findById(id)
}

function remove(userId, vacId) {
    return db('users_vacation').where({ 'user_id': userId }).andWhere({ 'vacation_id': vacId }).del()
}

function check(userId, vacId) {
    return db('users_vacation').where('user_id', userId).andWhere('vacation_id', vacId)
        .then(link => {
            if (!link.length) {
                return false
            } else {
                return true
            }
        });
};
