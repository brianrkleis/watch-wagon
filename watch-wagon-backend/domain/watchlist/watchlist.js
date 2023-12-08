const knex = require('../db/db_repository');

class WatchList {

    static async get_by_userid(userId) {
        const watchlist = await knex('watchlists').where('user_id', userId).first();
        if (!watchlist) {
            return await this.create_watchlist(userId);
        }
        return watchlist;
    }

    static async add_to_watchlist(userId, movieId) {
        const watchlist = await this.get_by_userid(userId);
        
        const already_exists = await knex('watchlist_movie_pivot').where("watchlist_id", watchlist.id).where("movie_id", movieId);
        if (already_exists.length > 0) {
            return {"message": "already added"}
        }
        await knex('watchlist_movie_pivot').insert({
            "watchlist_id": watchlist.id,
            "movie_id": movieId
        });

        return {"message": "added"};
    }

    static async remove_from_watchlist(userId, movieId) {
        const watchlist = await this.get_by_userid(userId);
        await knex('watchlist_movie_pivot').where('watchlist_id', watchlist.id).where('movie_id', movieId).del();
        return {"message": "removed"};
    }

    static async create_watchlist(userId) {
        return await knex('watchlists').insert({"user_id": userId});
    }

    static async get_movies(userId) {
        const watchlist = await this.get_by_userid(userId);
        return await knex('watchlist_movie_pivot').where('watchlist_id', watchlist.id);
    }
}

module.exports = { WatchList }