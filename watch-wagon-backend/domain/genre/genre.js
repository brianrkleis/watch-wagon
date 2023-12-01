const knex = require('../db/db_repository');
const genreMovieResource = require('./genreMovieResource');

class Genre {

    static async get_all() {
        var genres = await knex('genres')
            .select('genres.name', 'movies.title', 'movies.image', 'movies.id')
            .join('movie_has_genre', 'genres.id', 'movie_has_genre.genre_id')
            .join('movies', 'movie_has_genre.movie_id', 'movies.id');
        genres = genreMovieResource(genres);
        const agrupado = genres.reduce((acc, item) => {
            const key = item['name'];
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        }, {});
        
        return agrupado;
    }
}

module.exports = { Genre };