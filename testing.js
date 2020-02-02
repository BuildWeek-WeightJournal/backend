// const Users = require('./Users/usersModel');

// Users.find()
//     .then(res => {
//         console.log(res)
//     })

// Users.findById(1)
//     .then(response => {
//         console.log(response)
//     })

// Users.findBy({ username: 'bob' })
//     .then(response => {
//         console.log(response)
//     })
// const user = {username: 'user5', password: 'password'}

// Users.add(user)
//     .then(response => {
//         console.log(response)
//         process.exit();
//     })

const Workouts = require('./Workouts/workoutsModel');

const changes = {
    name: 'updated workout',
    reps: 2,
    weight: 1,
    body_region: 'arms',
    user_id: 3
}

const id = 4;

Workouts.update(changes, id).then(res => {
    console.log(res)
    process.exit()
})

// Workouts.findById(id)
//     .then(workout => {
//         if (workout) {
//             Workouts.update(changes, id)
//                 .then(updatedWorkout => {
//                     console.log(res.json(updatedWorkout))
//                 })
//         } else {
//             return null;
//         }
//     })