const router = require('express').Router();
const Users = require('../Users/usersModel');
const Workouts = require('../Workouts/workoutsModel');

router.get('/:id/workouts', (req, res) => {
	Users.findById(req.params.id)
		.then((user) => {
			if (!user) {
				res.status(401).json({ error: "user doesn't exist" });
			} else {
				Workouts.findByUserId(req.params.id).then((workouts) => {
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

router.post('/:id/workouts', (req, res) => {
    const workout = {...req.body, user_id: req.params.id};
    Users.findById(req.params.id)
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

router.put('/:id/workouts', (req, res) => {
    Users.findById(req.params.id)
        .then((user) => {
            if (!user) {
				res.status(401).json({ error: "user doesn't exist" });
            } else {
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
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "error getting user details"})
        })
})

module.exports = router;