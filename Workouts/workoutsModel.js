const db = require('../database/dbconfig');

module.exports = {
    find,
    findById,
    findByUserId,
    add
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
        .where({ user_id });
}

function add(workout) {
    return db('workouts')
        .insert(workout)
        .then(([id]) => {
            return findById(id);
        })
}