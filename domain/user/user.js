const knex = require('knex')();

class User {
    static find_by_id(id) {
        return knex('users').where('id', id).first();
    }

    static find_by_email(email) {
        return knex('users').where('email', email).first();
    }
}

module.exports = User;