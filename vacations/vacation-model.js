const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    update
};

function add(vac) {
    return db('vacations').insert(vac);
};

function find(){
    return db('vacations')
}

function update(vacId, change) {
    return db('vacations').where({'id': vacId}).update(change)
}