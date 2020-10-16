const login = require('./login');
const logout = require('./logout');

/**
 * Login a client, execute a function on the client, then logout the client.
 * @param {superagent.Agent} client
 * @param {function} fn
 * @param {string} username
 * @param {string} password
 * @returns The return value of `fn`
 * @example
 * const { createClient, useClient } = require('arubaos');
 *
 * function getNodeHierarchy(client) {
 *   return client
 *     .get('/configuration/object/node_hierarchy');
 * }
 *
 * useClient(createClient('10.11.12.13'), getNodeHierarchy)
 *  .then(console.log)
 *  .catch(console.error);
 */
module.exports = function useClient(
  client,
  fn,
  username = process.env.ARUBA_OS_USERNAME || 'admin',
  password = process.env.ARUBA_OS_PASSWORD || '',
) {
  return login(client, username, password)
    .then(() => fn(client))
    .finally(() => logout(client));
};
