const loginClient = require('./loginClient');
const logoutClient = require('./logoutClient');

/**
 * Login a client, execute a function using the client, then logout the client,
 * returning the value of the function.
 *
 * This is a simpler method than explicitly using `loginClient` & `logoutClient`,
 * which is the typical workflow.
 * @param {superagent.agent} client ArubaOS REST API client
 * @param {function} fn Function which only accepts a `client` parameter
 * @param {string} username Username of controller user
 * @param {string} password Password of controller user
 * @returns {Promise<any>} Return value of `fn`
 * @example <caption>Define a function:</caption>
 * function getAPDatabase(client) {
 *   return client
 *     .get('/configuration/showcommand')
 *     .query({ command: 'show ap database long' })
 *     .then(({ body }) => body['AP Database']);
 * }
 * @example <caption>Pass `client` & the function into `useClient`:</caption>
 * const apDatabase = await useClient(client, getAPDatabase, 'rick', 'wubba lubba dub-dub');
 * @example <caption>This is equivalent to:</caption>
 * await loginClient(client, 'rick', 'wubba lubba dub-dub');
 *
 * const apDatabase = await getAPDatabase(client);
 *
 * await logoutClient(client);
 */
module.exports = function useClient(
  client,
  fn,
  username = process.env.ARUBA_OS_USERNAME || 'admin',
  password = process.env.ARUBA_OS_PASSWORD || '',
) {
  return loginClient(client, username, password)
    .then(() => fn(client))
    .finally(() => logoutClient(client));
};
