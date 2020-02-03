const request = require('supertest');
const server = require('../server');
const db = require('../database/dbconfig');
const Users = require('../Users/usersModel');

describe('usersModel & authRouter', function() {
	beforeEach(async () => {
		await db('users').truncate();
	});
	describe('/api/auth/register', function() {
		it('should register two new users', async function() {
			await Users.add({ username: 'test', password: '123' });
			await Users.add({ username: 'test2', password: '456' });
			const users = await db('users');

			expect(users).toHaveLength(2);
		});

		it('should retrun a 201 Created', function() {
			return request(server)
				.post('/api/auth/register')
				.send({
					username: 'test',
					password: 'test'
				})
				.then((res) => {
					expect(res.status).toBe(201);
				});
		});
	});

	describe('/api/auth/login', function() {
		it('should return status code 200 when registering', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'new user', password: 'password' })
				.then(() => {
					return request(server)
						.post('/api/auth/login')
						.send({ username: 'new user', password: 'password' })
						.then((response) => {
							expect(response.status).toBe(200);
						});
				});
		});
		it('should return a token', function() {
			return request(server)
				.post('/api/auth/login')
				.send({ username: 'new user', password: 'password' })
				.then((response) => {
					expect(response.body.token);
				});
		});
	});
});
