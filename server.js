const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/authRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/docs', express.static('./docs'));

server.get('/', (req, res) => {
    res.send('This is working!')
}) 

module.exports = server;