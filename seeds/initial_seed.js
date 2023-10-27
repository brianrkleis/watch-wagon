const password_func = require('../domain/auth/password');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  return knex('users').del().then(async () => {
    await knex('users').insert({
      id: 1,
      username: 'admin',
      email: 'admin@admin.com',
      password: await password_func.hash_password('admin')
    });
  })
};
