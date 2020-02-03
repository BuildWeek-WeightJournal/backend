const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../Users/usersModel');

const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    const { username } = req.body;

    Users.findBy({ username })
        .then(username => {
            if(!username) {
                Users.add(user)
                .then(saved => {
                    return res.status(201).json(saved)
                })
            } else {
                return res.status(400).json({ message: 'User already exists, pick another name.' })
            }
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({error: "error registering user"})
        })
})

/** 
 * @api {post} /api/auth/register Register User
 * @apiName RegisterUser
 * @apiGroup Authentication
 * 
 * @apiParam {String} username username, needs to be unique.
 * @apiParam {String} password password, required.
 * 
 * @apiSuccessExample successful response: 
 * http/1.1 201 Created
 * {
 *   "id": 4,
 *   "username": "test",
 *   "password": "$2a$08$6fu3MlbA4mXGegw3h.m5eegLbRmG7KxkuplTA5lMLWa7shdXZMKYu"
 * }
 **/

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user);
                res.status(200).json({ message: `Welcome ${user.username}`, token })
            } else {
                res.status(401).json({ message: 'User does not exist.' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error logging in.' })
        })
    })

/** 
 * @api {post} /api/auth/login Login User
 * @apiName LoginUser
 * @apiGroup Authentication
 * 
 * @apiParam {String} username username, needs to be unique.
 * @apiParam {String} password password, required.
 * 
 * @apiSuccessExample successful response: 
 * http/1.1 201 Created
 * {
 *   "message": "Welcome test",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTgwNTk2NTgxLCJleHAiOjE1ODEyMDEzODF9.dCjB70A25ZCa7wmXhUAtoGKCtFESP8g-BRgdhw6jgG4"
 * }
 **/

function signToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '7d'
    }

    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;