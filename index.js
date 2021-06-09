import { agent } from 'superagent';

const {
  ARUBA_OS_HOST,
  ARUBA_OS_VERSION,
  ARUBA_OS_USERNAME,
  ARUBA_OS_PASSWORD,
} = process.env;

const DEFAULT_HOST = ARUBA_OS_HOST;
const DEFAULT_VERSION = ARUBA_OS_VERSION || 'v1';
const DEFAULT_USERNAME = ARUBA_OS_USERNAME || 'admin';
const DEFAULT_PASSWORD = ARUBA_OS_PASSWORD || '';

export function getRequestPrefix(host = DEFAULT_HOST, version = DEFAULT_VERSION) {
  return `https://${host}:4343/${version}`;
}

export function createClient(host = DEFAULT_HOST, version = DEFAULT_VERSION) {
  return agent()
    .use((request) => { request.url = getRequestPrefix(host, version) + request.url; });
}

export function loginClient({
  host = DEFAULT_HOST,
  version = DEFAULT_VERSION,
  client = createClient(host, version),
  username = DEFAULT_USERNAME,
  password = DEFAULT_PASSWORD,
}) {
  const params = new URLSearchParams({ username, password });

  return client
    .post('/api/login')
    .send(params.toString())
    // eslint-disable-next-line no-underscore-dangle
    .then(({ body }) => client.query({ UIDARUBA: body._global_result.UIDARUBA }));
}

export function logoutClient(client) {
  return client
    .post('/api/logout');
}

export function useClient({
  host = DEFAULT_HOST,
  version = DEFAULT_VERSION,
  client = createClient(host, version),
  username = DEFAULT_USERNAME,
  password = DEFAULT_PASSWORD,
  fn,
}) {
  return loginClient({ client, username, password })
    .then(() => fn(client))
    .finally(() => logoutClient(client));
}
