const request = require('supertest');
const server = require('../server');
const db = require('../database/dbconfig');
const Users = require('../Users/usersModel');

describe('workoutsRouter and model', function() {
    beforeEach(async () => {
		await db('users').truncate();
    });
    
    describe('GET /api/workouts/:userId', function() {
        it('should register new users', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'user10', password: 'password'})
                .then(() => {
                    return request(server)
                        .post('/api/auth/login')
                        .send({ username: 'user10', password: 'password' })
						.then((response) => {
                            const {token} = response.body;
                            return request(server)
                                .get('/api/workouts/1')
                                .set({authorization: token})
                                .then(response => {
                                    expect(response.body.error).toBe('no workouts to display')
                                    expect(response.status).toBe(400)
                                })
						});
                })
        });
    })

    describe('POST /api/workouts/:userId', function() {
        it('should register new user', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'user10', password: 'password'})
                .then(() => {
                    return request(server)
                        .post('/api/auth/login')
                        .send({ username: 'user10', password: 'password' })
						.then((response) => {
                            const {token} = response.body;
                            return request(server)
                                .post('/api/workouts/1')
                                .set({authorization: token})
                                .send({
                                    user_id: 1,
                                    name: 'bench',
                                    reps: 10,
                                    weight: 150,
                                    body_region: 'chest'
                                })
                                .then(response => {
                                    expect(response.body.name).toBe('bench')
                                    expect(response.status).toBe(201)
                                })
						});
                })
        });
    })
})
