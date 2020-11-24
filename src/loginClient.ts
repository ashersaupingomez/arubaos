/* eslint-disable no-underscore-dangle */
import { stringify } from 'querystring';
import type { Request, Response, SuperAgentStatic } from 'superagent';

/**
 * Login a client, enabling it to make requests thereafter.
 * 
 * This needs to be called before any requests are made.
 * @private
 * @param client - ArubaOS REST API client
 * @param username - Controller username
 * @param password - Controller password
 * @example
 * await loginClient();
 */
export default function loginClient(
  client: SuperAgentStatic & Request,
  username: string = process.env.ARUBA_OS_USERNAME || 'admin',
  password: string = process.env.ARUBA_OS_PASSWORD || '',
): Promise<Response> {
  return client
    .post('/api/login')
    .send(stringify({ username, password }))
    .then((response: Response) => {
      client.query({ UIDARUBA: response.body._global_result.UIDARUBA });

      return response;
    });
}
