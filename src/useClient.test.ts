/* eslint-disable import/no-extraneous-dependencies */
import baretest from 'baretest';
import { doesNotReject } from 'assert';
import type { Request, Response, SuperAgentStatic } from 'superagent';

import createClient from './createClient';
import useClient from './useClient';

const test = baretest('arubaos');

/**
 * @private
 * @param client - ArubaOS REST API client
 * @returns A response which contains the hostname of the controller
 */
function requestGetHostname(client: SuperAgentStatic & Request): Promise<Response> {
  return client
    .query({ command: 'show hostname' })
    .get('/configuration/showcommand');
}

/**
 * Disable TLS cert checks, for simplicity's sake
 * @private
 * @returns ArubaOS REST API client
 */
const client: SuperAgentStatic & Request = createClient()
  .disableTLSCerts();

/**
 * Note: a `.env` file is required at the root of this package for tests to work.
 *
 * `useClient` relies on the other 3 functions to work correctly.
 * Therefore, if it is working correctly, the others are also.
 *
 * This test resolves if a `200` HTTP status code is received from the ArubaOS controller.
 * Otherwise, the promise rejects.
 * @private
 */
test('everything works', () => doesNotReject(useClient(requestGetHostname, client)));

test.run();
