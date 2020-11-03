const baretest = require('baretest');
const assert = require('assert');
const { agent, Response } = require('superagent');

const { name } = require('./package');
const {
  createClient,
  loginClient,
  logoutClient,
  useClient,
} = require('./lib');

const test = baretest(name);

function getAPDatabase(client) {
  return client
    .get('/configuration/showcommand')
    .query({ command: 'show ap database' })
    .then(({ body }) => body['AP Database']);
}

const client = createClient();

test('createClient', () => assert(client instanceof agent));

test('loginClient', () => loginClient(client)
  .then((response) => assert(response instanceof Response)));

test('logoutClient', () => logoutClient(client)
  .then((response) => assert(response instanceof Response)));

test('useClient', () => useClient(client, getAPDatabase)
  .then((apDatabase) => assert(Array.isArray(apDatabase))));

test.run();
