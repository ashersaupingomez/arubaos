const login = require('./login');
const logout = require('./logout');

module.exports = function useClient(
  client,
  fn,
  username = process.env.ARUBA_OS_USERNAME,
  password = process.env.ARUBA_OS_PASSWORD,
) {
  return login(client, username, password)
    .then(() => fn(client))
    .finally(() => logout(client));
};
