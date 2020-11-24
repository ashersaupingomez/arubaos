# arubaos

Superagent utilities for interacting with the ArubaOS REST API

## Features

-   Tested & working on ArubaOS REST API version v1.
-   Based on [superagent.Agent](https://visionmedia.github.io/superagent/#agents-for-global-state), a simple & robust http client class with in-built cookie handling.
-   Simple & flexible API with minimal moving parts.
-   Able to work with environment variables.
-   Super-lightweight package.

## Getting Started

```javascript
const { useClient } = require('arubaos');

function requestGetHostname(client) {
  return client
    .query({ command: 'show hostname' })
    .get('/configuration/showcommand');
}

useClient(requestGetHostname)
  .then(console.log)
  .catch(console.error);
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [createClient](#createclient)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [useClient](#useclient)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)

### createClient

Request URLs are prepended with the appropriate URL base,
so only REST API endpoints are required.

#### Parameters

-   `host` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** Controller IP address (typically) (optional, default `process.env.ARUBA_OS_HOST`)
-   `version` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ArubaOS REST API version (optional, default `process.env.ARUBA_OS_VERSION||'v1'`)

#### Examples

```javascript
const client = createClient();
```

If certs hasn't been configured on the controller


```javascript
const client = createClient()
  .disableTLSCerts();
```

Returns **any** ArubaOS REST API client

### useClient

#### Parameters

-   `fn` **function (client: any): any** Function whose only parameter is `client`
-   `client` **any** ArubaOS REST API client (optional, default `createClient()`)
-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Controller username (optional, default `process.env.ARUBA_OS_USERNAME||'admin'`)
-   `password` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Controller password (optional, default `process.env.ARUBA_OS_PASSWORD||''`)

#### Examples

First, define a function which accepts & uses the `client` paramter


```javascript
function requestGetHostname(client) {
  return client
    .query({ command: 'show hostname' })
    .get('/configuration/showcommand');
}
```

Then, use the `useClient` function which returns the resolved value of `fn`


```javascript
const response = await useClient(requestGetHostname);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** Promise that resolves to the return value of `fn`

## Testing

Tests are performed on an actual ArubaOS controller whose credentials are defined by environment variables.
These can be fed either via the command line or a `.env` file at the root of this package.

```bash
$ npm test
```
