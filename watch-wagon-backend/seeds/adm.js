const password_func = require('../domain/auth/password');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('watchlist_movie_pivot').del();
  await knex('watchlists').del();
  await knex('rents').del();
  await knex('users').del();
  const user = await knex('users').insert([
    {
      email: 'admin@admin.com', 
      username: 'admin',
      password: await password_func.hash_password('admin')
    }
  ]);
  await knex('watchlists').insert([
    {
      user_id: user.id
    }
  ]);
};
