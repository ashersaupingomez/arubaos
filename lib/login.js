/* eslint-disable no-underscore-dangle */
const { stringify } = require('querystring');

module.exports = function login(
  client,
  username = process.env.ARUBA_OS_USERNAME,
  password = process.env.ARUBA_OS_PASSWORD,
) {
  return client
    .post('/api/login')
    .send(stringify({ username, password }))
    .then(({ body }) => client
      .query({ UIDARUBA: body._global_result.UIDARUBA }));
};
