const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../Users/usersModel');

const { jwtSecret } = require('../config/secrets');

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