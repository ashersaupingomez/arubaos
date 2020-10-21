module.exports = function getAccessPoints(client) {
  return client
    .get('/configuration/showcommand')
    .query({ command: 'show ap database long' })
    .then(({ body }) => body['AP Database']);
};