/**
 * Logout a client.
 * @param {superagent.Agent} client
 * @example
 * const { createClient, login, logout } = require('arubaos');
 *
 * const client = createClient('10.11.12.13');
 *
 * await login(client);
 *
 * ...
 *
 * await logout(client);
 */
module.exports = function logout(client) {
  return client
    .post('/api/logout');
};
