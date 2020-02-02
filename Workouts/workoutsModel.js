const db = require('../database/dbconfig');

module.exports = {
    find,
    findById,
    findByUserId
}

function find() {
    return db('workouts');
}

function findById(id) {
    return db('workouts')
        .where({ id })
        .first();
}

function findByUserId(user_id) {
    return db('workouts')
        .where({ user_id })
}