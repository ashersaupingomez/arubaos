import type { Request, SuperAgentStatic } from 'superagent';

/**
 * Logout a client, closing off the session.
 * 
 * This needs to be called after all requests are made.
 * @private
 * @param client - ArubaOS REST API client
 * @example
 * await logoutClient(client);
 */
export default function logoutClient(client: SuperAgentStatic & Request): Request {
  return client
    .post('/api/logout');
}
