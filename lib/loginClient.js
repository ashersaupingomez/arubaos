/* eslint-disable no-underscore-dangle */
const { stringify } = require('querystring');

/**
 * Note: must be performed before any requests
 * @param {superagent.agent} client ArubaOS REST API client
 * @param {string} username Username of controller user
 * @param {string} password Password of controller user
 * @returns {superagent.Request} Login request for ArubaOS REST API
 * @example
 * await loginClient(client, 'rick', 'wubba lubba dub-dub');
 */
module.exports = function loginClient(
  client,
  username = process.env.ARUBA_OS_USERNAME || 'admin',
  password = process.env.ARUBA_OS_PASSWORD || '',
) {
  return client
    .post('/api/login')
    .send(stringify({ username, password }))
    .then((response) => {
      client
        .query({ UIDARUBA: response.body._global_result.UIDARUBA });

      return response;
    });
};
