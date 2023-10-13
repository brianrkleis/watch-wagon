const { Pool } = require("pg");

const knex = require('knex')();

async function selectWhere(table, conditions) {
    var toSelect = knex(table)
    for (condition, value of conditions) {
        toSelect = toSelect.where(condition, value);
    }
    return toSelect;
}

async function insert(table, obj) {
    
}

module.exports = request;