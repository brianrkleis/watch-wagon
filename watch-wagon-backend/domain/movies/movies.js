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
                            .where('movies.id', '=', id)
                            .select('genres.id', 'genres.name'));
        
        movies.streamings = streamingRentResource(await knex('streaming_rents')
                                .join('movies', 'movies.id', '=', 'streaming_rents.movie_id')
                                .select(
                                    [
                                        'streaming_rents.id', 
                                        'streaming_rents.movie_id', 
                                        'streaming_rents.price', 
                                        'streaming_rents.link', 
                                        'streaming_rents.rent_days', 
                                        'streaming_rents.source'
                                    ]
                                )
                                .where('streaming_rents.movie_id', '=', id));
        
        return fullResource(movies);
    }
    static async get_all(){
        const movies = await knex('movies');
        return resource(movies);
    }

    static async search(query) {
        const movies = await knex('movies').whereRaw(`LOWER(title) LIKE LOWER('%${query}%')`);
        return resource(movies);
    }

    static async get_movie_stats(movie_id, user_id) {
        let in_watchlist = await knex('watchlists')
                                    .join('watchlist_movie_pivot', 'watchlists.id', '=', 'watchlist_movie_pivot.watchlist_id')
                                    .where('watchlists.user_id', user_id)
                                    .andWhere('watchlist_movie_pivot.movie_id', movie_id)
                                    .first();

        let in_rent = await knex('rents')
                                    .join('streaming_rents', 'rents.streaming_rent_id', '=', 'streaming_rents.id')
                                    .where('rents.user_id', user_id)
                                    .andWhere('streaming_rents.movie_id', movie_id)
                                    .select([
                                        'streaming_rents.id',
                                        'streaming_rents.price',
                                        'streaming_rents.link',
                                        'streaming_rents.rent_days',
                                        'rents.rent_expire',
                                        'rents.rent_dt',
                                        'streaming_rents.source'
                                    ]);

        let total_watchlist = await knex('watchlists')
                                    .join('watchlist_movie_pivot', 'watchlists.id', '=', 'watchlist_movie_pivot.watchlist_id')
                                    .where('watchlist_movie_pivot.movie_id', movie_id)
                                    .count()
                                    .first();
        
        return {
            total: Number(total_watchlist['count']),
            in_watchlist: in_watchlist != undefined,
            in_rent: in_rent
        }
    }

}

module.exports = { Movies };