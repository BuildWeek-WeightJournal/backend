const knex = require('knex');

const knexFileConfig = require('../knexfile');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(knexFileConfig[environment]);