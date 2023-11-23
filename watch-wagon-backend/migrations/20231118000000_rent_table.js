/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('movies', function (table) {
            table.increments('id');
            table.integer('duration');
            table.string('title');
            table.integer('year');
            table.string('director');
            table.string('description');
            table.string('casting');
            table.string('image');
        })
        .createTable('genres', function (table) {
            table.increments('id');
            table.string('name');
        })
        .createTable('movie_has_genre', function (table) {
            table.increments('id');

            table.bigInteger('movie_id');
            table.foreign('movie_id').references('id').inTable('movies');

            table.bigInteger('genre_id');
            table.foreign('genre_id').references('id').inTable('genres');
        })
        .alterTable('watchlist_movie_pivot', function (table) {
            table.foreign('movie_id').references('id').inTable('movies');
        })
        .createTable('streaming_rents', function (table) {
            table.increments('id');
            table.string('link');
            table.double('price');
            table.integer('rent_days');

            table.bigInteger('movie_id');
            table.foreign('movie_id').references('id').inTable('movies');
        })
        .createTable('rents', function (table) {
            table.increments('id');
            table.datetime('rent_dt');
            table.datetime('rent_expire');
            table.string('payment_method');
            
            table.bigInteger('streaming_rent_id');
            table.foreign('streaming_rent_id').references('id').inTable('streaming_rents');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rents')
        .dropTableIfExists('movie_has_genre')
        .dropTableIfExists('genres')
        .dropTableIfExists('streaming_rents')
        .dropTableIfExists('movies');
};
