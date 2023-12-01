const knex = require('../db/db_repository');
const resource = require('./moviesResource');
const fullResource = require('./fullMovieResource');
const genreResource = require('../genre/genreResource');
const streamingRentResource = require('../streamingRent/streamingRentResource');

class Movies{
    static async find_by_id(id) {
        let movies = await knex('movies').where('id', id).first();
        movies.genres = genreResource(await knex('genres')
                            .join('movie_has_genre', 'genres.id', '=', 'movie_has_genre.genre_id')
                            .join('movies', 'movies.id', '=', 'movie_has_genre.movie_id')
                            .where('movies.id', '=', id));
        
        movies.streamings = streamingRentResource(await knex('streaming_rents')
                                .join('movies', 'movies.id', '=', 'streaming_rents.movie_id')
                                .where('streaming_rents.movie_id', '=', id));
        
        return fullResource(movies);
    }
    static async get_all(){
        const movies = await knex('movies');
        return resource(movies);
    }

}

module.exports = { Movies };