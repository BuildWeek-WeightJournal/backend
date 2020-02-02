const db = require('../database/dbconfig');

module.exports = {
    find,
    findById,
    findByUserId,
    add,
    update,
    remove
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

function update(id, changes) {
    return db('workouts')
        .where({ id })
        .update(changes)
        .then(updated => {
            return findById(updated);
        })
}

function remove(id) {
    return db('workouts')
        .where({ id })
        .del();
}