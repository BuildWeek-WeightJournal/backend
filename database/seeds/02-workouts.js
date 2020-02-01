
exports.seed = function(knex) {

      return knex('table_name').insert([
        { user_id: 1, name:'test', reps: 1, weight: 1, body_region: 'Legs'},
        { user_id: 2, name:'test', reps: 2, weight: 2, body_region: 'arms'},
        { user_id: 3, name:'test', reps: 3, weight: 3, body_region: 'back'}
      ]);
};
