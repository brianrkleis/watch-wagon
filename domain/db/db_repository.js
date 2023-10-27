const { Pool } = require("pg");

const knex = require('knex')(require('../../knexfile'));

module.exports = knex;