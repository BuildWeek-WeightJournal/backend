const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../Users/usersModel');

const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "error registering user"})
        })
})

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

function signToken(user) {
    const payload = {
        id: user.id,
    }

    const options = {
        expiresIn: '7d'
    }

    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;