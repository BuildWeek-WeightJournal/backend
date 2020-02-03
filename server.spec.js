const request = require('supertest');
const server = require('./server');

describe('server', function() {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('tests environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('GET /', function() {
        it('should return a 200 OK', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
})

