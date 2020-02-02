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

module.exports = router;