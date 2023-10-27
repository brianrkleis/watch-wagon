const knex = require('../db/db_repository');
const resource = require('./userResource');

class User {
    static async find_by_id(id) {
        const user = await knex('users').where('id', id).first();
        return resource(user);
    }

    static async find_by_email(email) {
        return resource(await knex('users').where('email', email).first());
    }

    static async find_by_email_w_password(email) {
        return resource(await knex('users').where('email', email).first(), true);
    }

    static async create_user(user) {
        return resource(await knex('users').insert(user));
    }

    static async update_user(userId, params) {
        const user = await this.find_by_id(userId);
        for (let param in params) {
            user[param] = params[param];
        }
        return resource(await knex('users').update(user));
    }
}

module.exports = { User };