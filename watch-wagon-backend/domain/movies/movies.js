const knex = require('../db/db_repository');
const resource = require('./moviesResource');

class Movies{
    static async find_by_id(id) {
        const movies = await knex('movies').where('id', id).first();
        return resource(movies);
    }

}

module.exports = { Movies };