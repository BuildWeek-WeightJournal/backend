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

Workouts.findByUserId(1).then(res => {
    console.log(res)
    process.exit();
})