const request = require('supertest');
const server = require('../server');
const db = require('../database/dbconfig');

describe('workoutsRouter and model', function() {
	beforeEach(async () => {
		await db('users').truncate();
		await db('workouts').truncate();
	});

	describe('GET /api/workouts/:userId', function() {
		it('should register new users', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'user10', password: 'password' })
				.then(() => {
					return request(server)
						.post('/api/auth/login')
						.send({ username: 'user10', password: 'password' })
						.then((response) => {
							const { token } = response.body;
							return request(server)
								.get('/api/workouts/1')
								.set({ authorization: token })
								.then((response) => {
									expect(response.body.error).toBe('no workouts to display');
									expect(response.status).toBe(400);
								});
						});
				});
		});
	});

	describe('POST /api/workouts/:userId', function() {
		it('should register new user', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'user10', password: 'password' })
				.then(() => {
					return request(server)
						.post('/api/auth/login')
						.send({ username: 'user10', password: 'password' })
						.then((response) => {
							const { token } = response.body;
							return request(server)
								.post('/api/workouts/1')
								.set({ authorization: token })
								.send({
									user_id: 1,
									name: 'bench',
									reps: 10,
									weight: 150,
									body_region: 'chest'
								})
								.then((response) => {
									expect(response.body.name).toBe('bench');
									expect(response.status).toBe(201);
								});
						});
				});
		});
	});

	describe('PUT /api/workouts/:userId', function() {
		it('should update users workout', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'user10', password: 'password' })
				.then(() => {
					return request(server)
						.post('/api/auth/login')
						.send({ username: 'user10', password: 'password' })
						.then((response) => {
							const { token } = response.body;
							return request(server)
								.post('/api/workouts/1')
								.set({ authorization: token })
								.send({
									user_id: 1,
									name: 'bench',
									reps: 10,
									weight: 150,
									body_region: 'chest'
								})
								.then(() => {
									return request(server)
										.put('/api/workouts/1')
										.send({
											id: 1,
											name: 'dead lift',
											reps: 10,
											weight: 150,
											body_region: 'back'
										})
										.then((response) => {
											expect(response.body.name).toBe('dead lift');
											expect(response.body.body_region).toBe('back');
											expect(response.status).toBe(200);
										});
								});
						});
				});
		});
	});

	describe('DELETE /api/workouts/:userId', function() {
		it('should update users workout', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'user10', password: 'password' })
				.then(() => {
					return request(server)
						.post('/api/auth/login')
						.send({ username: 'user10', password: 'password' })
						.then((response) => {
							const { token } = response.body;
							return request(server)
								.post('/api/workouts/1')
								.set({ authorization: token })
								.send({
									user_id: 1,
									name: 'bench',
									reps: 10,
									weight: 150,
									body_region: 'chest'
								})
								.then(() => {
									return request(server).delete('/api/workouts/1').then((response) => {
										expect(response.body.message).toBe('Workout deleted. Good job.');
										expect(response.status).toBe(200);
									});
								});
						});
				});
		});
	});
});
