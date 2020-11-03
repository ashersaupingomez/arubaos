const { agent } = require('superagent');
const prefix = require('superagent-prefix');

/**
 * @param {string} host IP address of controller
 * @param {string} version API version of ArubaOS REST API
 * @returns {superagent.agent} ArubaOS REST API client with TLS checks ignored
 * @example
 * const client = createClient('10.11.12.13', 'v1');
 */
module.exports = function createClient(
  host = process.env.ARUBA_OS_HOST,
  version = process.env.ARUBA_OS_VERSION || 'v1',
) {
  return agent()
    .use(prefix(`https://${host}:4343/${version}`))
    .disableTLSCerts();
};
