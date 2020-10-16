const { agent } = require('superagent');
const prefix = require('superagent-prefix');

/**
 * Create a client.
 * @param {string} host Controller IP address
 * @param {string} version Controller API version
 * @returns superagent.Agent
 * @example
 * const { createClient } = require('arubaos');
 *
 * const client = createClient('10.11.12.13');
 *
 * ...
 */
module.exports = function createClient(
  host = process.env.ARUBA_OS_HOST,
  version = process.env.ARUBA_OS_VERSION || 'v1',
) {
  return agent()
    .use(prefix(`https://${host}:4343/${version}`))
    .disableTLSCerts();
};
