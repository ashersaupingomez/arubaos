/* eslint-disable no-return-assign */
import { agent } from 'superagent';
import type { Request, SuperAgentStatic } from 'superagent';

/**
 * Request URLs are prepended with the appropriate URL base,
 * so only REST API endpoints are required.
 * @param host - Controller IP address (typically)
 * @param version - ArubaOS REST API version
 * @returns ArubaOS REST API client
 * @example
 * const client = createClient();
 * @example <caption>If certs hasn't been configured on the controller</caption>
 * const client = createClient()
 *   .disableTLSCerts();
 */
export default function createClient(
  host: string | undefined = process.env.ARUBA_OS_HOST,
  version: string = process.env.ARUBA_OS_VERSION || 'v1',
): SuperAgentStatic & Request {
  return agent()
    .use((request) => request.url = `https://${host}:4343/${version}${request.url}`);
}
