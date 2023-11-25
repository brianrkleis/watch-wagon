const password_func = require('../domain/auth/password');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').where('username', 'admin').del();
  await knex('users').insert([
    {
      email: 'admin@admin.com', 
      username: 'admin',
      password: await password_func.hash_password('admin')
    }
  ]);
};
