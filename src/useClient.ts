import type { Request, SuperAgentStatic } from 'superagent';

import createClient from './createClient';
import loginClient from './loginClient';
import logoutClient from './logoutClient';

/**
 * @param fn - Function whose only parameter is `client`
 * @param client - ArubaOS REST API client
 * @param username - Controller username
 * @param password - Controller password
 * @returns Promise that resolves to the return value of `fn`
 * @example <caption>First, define a function which accepts & uses the `client` paramter</caption>
 * function requestGetHostname(client) {
 *   return client
 *     .query({ command: 'show hostname' })
 *     .get('/configuration/showcommand');
 * }
 * @example <caption>Then, use the `useClient` function which returns the resolved value of `fn`</caption>
 * const response = await useClient(requestGetHostname);
 */
export default function useClient(
  fn: (client: SuperAgentStatic & Request) => any,
  client: SuperAgentStatic & Request = createClient(),
  username: string = process.env.ARUBA_OS_USERNAME || 'admin',
  password: string = process.env.ARUBA_OS_PASSWORD || '',
): Promise<any> {
  return loginClient(client, username, password)
    .then(() => fn(client))
    .finally(() => logoutClient(client));
}
