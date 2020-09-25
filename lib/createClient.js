const { agent } = require('superagent');
const prefix = require('superagent-prefix');

module.exports = function createClient(
  host = process.env.ARUBA_OS_HOST,
  version = process.env.ARUBA_OS_VERSION,
) {
  return agent()
    .use(prefix(`https://${host}:4343/${version}`))
    .disableTLSCerts();
};
