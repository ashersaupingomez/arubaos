/* eslint-disable no-underscore-dangle */
const { stringify } = require('querystring');

/**
 * Login a client
 * @param {superagent.Agent} client
 * @param {string} username
 * @param {string} password
 * @example
 * const { createClient, login } = require('arubaos');
 *
 * const client = createClient('10.11.12.13');
 *
 * await login(client);
 *
 * ...
 */
module.exports = function login(
  client,
  username = process.env.ARUBA_OS_USERNAME || 'admin',
  password = process.env.ARUBA_OS_PASSWORD || '',
) {
  return client
    .post('/api/login')
    .send(stringify({ username, password }))
    .then(({ body }) => client
      .query({ UIDARUBA: body._global_result.UIDARUBA }));
};
