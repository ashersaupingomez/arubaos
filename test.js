import baretest from 'baretest';
import { doesNotReject } from 'assert';

import { createClient, useClient } from './index.js';

const test = baretest('arubaos');

function requestGetHostname(client) {
  return client
    .query({ command: 'show hostname' })
    .get('/configuration/showcommand');
}

const client = createClient()
  .disableTLSCerts();

test('all works', () => doesNotReject(useClient({
  client,
  fn: requestGetHostname,
})));

test.run();
