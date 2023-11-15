const knex = require('../db/db_repository');
const resource = require('./userResource');
const password_func = require('../auth/password');

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
        user.password = password_func.hash_password(user.password);
        await knex('users').insert(user);
        return {"message": "created"};
    }

    static async update_user(userId, params) {
        if (params.password) {
            params.password = password_func.hash_password(user.password);
        }
        let updated = await knex('users').where('id', userId).first().update(params, ['id'].concat(Object.keys(params)));
        updated = updated[0];
        if (updated.id == userId) {
            delete updated.id;
            return {"message": "updated", "what": updated};
        }
        return {"error": "error on updating"}
    }
}

module.exports = { User };