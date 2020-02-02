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
    name: 'update',
    reps: 20,
    weight: 45,
    body_region: 'b',
    user_id: 3
}

const id = 4;

Workouts.update(2, changes).then(res => {
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