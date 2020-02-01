const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');

module.exports  = (req, res, next) => {
    const { authorization } = req.headers.auth;

    if(authorization) {
        jwt.verify(authorization, jwtSecret, (err, token) => {
            if(err) {
                res.status(401).json({ message: 'Invalid token.' })
            } else {
                req.user = { username: token.username }
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Invalid credentials.' })
    }
}