const baretest = require('baretest');
const assert = require('assert');

const { createClient, useClient } = require('./lib');
const { name } = require('./package');

const test = baretest(name);

function getNodeHierarchy(client) {
  return client
    .get('/configuration/object/node_hierarchy');
}

const client = createClient();

test('login, execute a function, then logout', async () => {
  const { ok } = await useClient(client, getNodeHierarchy);

  assert.ok(ok);
});

test('fails to execute a function after logout', () => {
  assert.rejects(() => getNodeHierarchy(client));
});

test.run();
