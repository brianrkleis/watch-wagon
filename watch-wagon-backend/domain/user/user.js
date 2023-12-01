const knex = require('../db/db_repository');
const resource = require('./userResource');
const password_func = require('../auth/password');
const rent_resource = require('../rent/rentResource');
const movie_resource = require('../movies/moviesResource');

class User {
    static async find_by_id(id) {
        const user = await knex('users').where('users.id', id).first();
        user.rents = await knex('rents').where('user_id', id);
        user.rents.streaming_rent = await knex('streaming_rents').where('id', user.rents.streaming_rent_id);
        user.rents = rent_resource(user.rents);
        
        user.movies = movie_resource(await knex('movies')
                        .join('watchlist_movie_pivot', 'movies.id', '=', 'watchlist_movie_pivot.movie_id')
                        .join('watchlists', 'watchlist_movie_pivot.watchlist_id', '=', 'watchlists.id')
                        .where('watchlists.user_id', id));
        return resource(user);
    }

    static async find_by_email(email) {
        return resource(await knex('users').where('email', email).first());
    }

    static async find_by_email_w_password(email) {
        return resource(await knex('users').where('email', email).first(), true);
    }

    static async create_user(user) {
        if (await this.find_by_email(user.email).id != undefined) {
            return {"error": "E-mail já registrado"};
        }
        user = {
            username: user.username,
            email: user.email,
            password: user.password
        };
        user.password = await password_func.hash_password(user.password);
        await knex('users').insert(user);
        await knex('watchlists').insert({"user_id": (await this.find_by_email(user.email)).id});
        return {"message": "created"};
    }

    static async update_user(userId, params) {
        params = {
            username: params.username,
            password: params.password,
            id: userId
        };
        if (params.password) {
            params.password = await password_func.hash_password(user.password);
        }
        let updated = await knex('users').where('id', userId)
                                         .first()
                                         .update(params)
                                         .returning(Object.keys(params).filter(key => params[key] != null || key == 'id'));
        console.log(updated);
        updated = updated[0];
        if (updated.id == userId) {
            delete updated.id;
            return {"message": "updated", "what": updated};
        }
        return {"error": "error on updating"}
    }
}

module.exports = { User };