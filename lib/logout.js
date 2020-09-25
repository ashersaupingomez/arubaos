module.exports = function logout(client) {
  return client
    .post('/api/logout');
};
