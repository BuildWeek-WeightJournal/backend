const router = require('express').Router();
const Users = require('../Users/usersModel');
const Workouts = require('./workoutsModel');

const authentication  = require('../auth/restrictedMiddleware');

router.get('/:userId', authentication, (req, res) => {
	Users.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				res.status(401).json({ error: "user doesn't exist" });
			} else {
				Workouts.findByUserId(req.params.userId).then((workouts) => {
					if (workouts.length === 0) {
						res.status(400).json({ error: 'no workouts to display' });
					} else {
						res.status(200).json(workouts);
					}
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: 'error retrieving workouts' });
		});
});

/** 
 * @api {get} /api/workouts/:usedId GET users workouts
 * @apiName GET Workout
 * @apiGroup Workouts
 * 
 * @apiParam {String} username username, required.
 * @apiParam {String} password password, required.
 * 
 * @apiSuccessExample successful response: 
 * http/1.1 200 OK
 * 
 [
    {
        "id": 1,
        "user_id": 1,
        "name": "Bench",
        "reps": 5,
        "weight": 500,
        "body_region": "Chest",
        "date": "2020-02-02 18:29:18"
    },
    {
        "id": 2,
        "user_id": 1,
        "name": "Squat",
        "reps": 5,
        "weight": 800,
        "body_region": "Full body",
        "date": "2020-02-02 18:29:18"
    },
]
 **/

router.post('/:userId', (req, res) => {
    const workout = {...req.body, user_id: req.params.userId};
    Users.findById(req.params.userId)
        .then((user) => {
            if (!user) {
				res.status(401).json({ error: "user doesn't exist" });
            } else {
                Workouts.add(workout)
                    .then(workout => {
                        if (!workout) {
                            res.status(400).json({error: 'missing fields'})
                        } else {
                            res.status(201).json(workout)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({error: "error posting new workout"})
                    })
            }
        })
})

/** 
 * @api {post} /api/workouts/:usedId POST new workout
 * @apiName POST Workout
 * @apiGroup Workouts
 * 
 * @apiParam {String} name name of workout, required.
 * @apiParam {Integer} reps amount of reps.
 * @apiParam {Integer} weight amount of weight.
 * @apiParam {String} body_region name of workout.
 * 
 * @apiSuccessExample successful response: 
 * http/1.1 201 Created
 * 
 [
    {
    "id": 10,
    "user_id": 1,
    "name": "Bench",
    "reps": 5,
    "weight": 150,
    "body_region": "Chest",
    "date": "2020-02-02 20:28:51"
    }
]
 **/

router.put('/:userId', (req, res) => {
    Workouts.update(req.body.id, req.body)
    .then(updateWorkout => {
        if (!updateWorkout) {
            res.status(400).json({error: "missing field"})
        } else {
            res.status(200).json(updateWorkout)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error updating workout"})
    })
})

/** 
 * @api {put} /api/workouts/:usedId PUT update workout
 * @apiName PUT Workout
 * @apiGroup Workouts
 * 
 * @apiParam {String} name name of workout, required.
 * @apiParam {Integer} reps amount of reps.
 * @apiParam {Integer} weight amount of weight.
 * @apiParam {String} body_region name of workout.
 * 
 * @apiSuccessExample successful response: 
 * http/1.1 200 Created
 * 
 [
    {
    "id": 10,
    "user_id": 1,
    "name": "Squat",
    "reps": 10,
    "weight": 250,
    "body_region": "Full Body",
    "date": "2020-02-02 20:28:51"
}
]
 **/

router.delete('/:workoutId', (req, res) => {
    Workouts.remove(req.params.workoutId)
        .then(() => {
            res.status(200).json({ message: 'Workout deleted. Good job.' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error deleting workout' })
        })
})

/** 
 * @api {delete} /api/workouts/:workoutId DELETE workout
 * @apiName DELETE Workout
 * @apiGroup Workouts
 * 
 * @apiSuccessExample successful response: 
 * http/1.1 200 OK
 * 
{
    "message": "Workout deleted. Good job."
}
 **/

module.exports = router;