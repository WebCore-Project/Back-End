const db = require('../database/db-config.js');

module.exports = {
    add,
    find
};

function add(vac) {
    return db('vacations').insert(vac);
};

function find(){
    return db('vacations')
}