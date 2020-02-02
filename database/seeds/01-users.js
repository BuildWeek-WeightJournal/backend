const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password: bcrypt.hashSync('user1', 8) },
        { username: 'user2', password: bcrypt.hashSync('user2', 8) },
        { username: 'user3', password: bcrypt.hashSync('user3', 8) } 
      ]);
};
