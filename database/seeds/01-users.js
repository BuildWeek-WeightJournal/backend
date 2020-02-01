const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user', password: bcrypt.hashSync('user', 8) },
        { username: 'user2', password: bcrypt.hashSync('123password', 8) },
        { username: 'user3', password: bcrypt.hashSync('password', 8) } 
      ]);
};
