/**
 * Note: must be performed after requests
 * @param {superagent.agent} client ArubaOS REST API client
 * @returns {superagent.Request} Logout request for the ArubaOS REST API
 * @example
 * await logoutClient(client);
 */
module.exports = function logoutClient(client) {
  return client
    .post('/api/logout');
};
