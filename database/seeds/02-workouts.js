
exports.seed = function(knex) {

      return knex('workouts').insert([
        { user_id: 1, name:'Bench', reps: 5, weight: 500, body_region: 'Chest'},
        { user_id: 1, name:'Squat', reps: 5, weight: 800, body_region: 'Full body'},
        { user_id: 1, name:'Deadlift', reps: 8, weight: 1200, body_region: 'Back'},
        { user_id: 2, name:'Deadlift', reps: 10, weight: 100, body_region: 'Back'},
        { user_id: 2, name:'Squat', reps: 10, weight: 150, body_region: 'Full body'},
        { user_id: 2, name:'Bench', reps: 5, weight: 200, body_region: 'Chest'},
        { user_id: 3, name:'Bench', reps: 15, weight: 100, body_region: 'Chest'},
        { user_id: 3, name:'Deadlift', reps: 10, weight: 150, body_region: 'Back'},
        { user_id: 3, name:'Squat', reps: 15, weight: 100, body_region: 'Full body'}
      ]);
};
