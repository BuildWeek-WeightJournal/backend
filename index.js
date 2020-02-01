const server = require('./server.js');

const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})