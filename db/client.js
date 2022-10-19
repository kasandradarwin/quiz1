const knex = require('knex');
const knexfile = require('../knexfile');
const client = knex(knexfile.development);
const environment = process.env.NODE_ENV || "development"
const environmentConfig = knexfile[environment]


const connection = knex(environmentConfig)

module.exports = connection;