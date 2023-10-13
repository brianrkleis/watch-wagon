/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('email').unique();
            table.string('username');
            table.string('password');
        })
        .createTable('watchlists', function (table) {
            table.increments('id');

            table.bigInteger('user_id');
            table.foreign('user_id').references('id').inTable('users');
        })
        .createTable('watchlist_movie_pivot', function (table) {
            table.increments('id');

            table.bigInteger('watchlist_id');
            table.foreign('watchlist_id').references('id').inTable('watchlists');

            table.bigInteger('movie_id');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('watchlist_movie_pivot')
        .dropTableIfExists('watchlists')
        .dropTableIfExists('users');
};
