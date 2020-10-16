# arubaos

Superagent utilities for interacting with the ArubaOS REST API

## Features
-   Tested & working on ArubaOS REST API version v1.
-   Based on [superagent.Agent](https://visionmedia.github.io/superagent/#agents-for-global-state), a simple & robust http client class with in-built cookie handling.
-   Simple & flexible API with minimal moving parts.
-   Able to work with environment variables.
-   Super-lightweight package.

## Testing

Tests are performed on a defined ArubaOS controller. Include the `ARUBA_OS_HOST` environment variable, at minimum, along with any other of the mentioned environment variables.

```bash
ARUBA_OS_HOST=10.11.12.13 npm test
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [createClient](#createclient)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [login](#login)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)
-   [logout](#logout)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)
-   [useClient](#useclient)
    -   [Parameters](#parameters-3)
    -   [Examples](#examples-3)

### createClient

Create a client.

#### Parameters

-   `host` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Controller IP address (optional, default `process.env.ARUBA_OS_HOST`)
-   `version` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Controller API version (optional, default `process.env.ARUBA_OS_VERSION||'v1'`)

#### Examples

```javascript
const { createClient } = require('arubaos');

const client = createClient('10.11.12.13');

...
```

Returns **any** superagent.Agent

### login

Login a client

#### Parameters

-   `client` **superagent.Agent** 
-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `process.env.ARUBA_OS_USERNAME||'admin'`)
-   `password` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `process.env.ARUBA_OS_PASSWORD||''`)

#### Examples

```javascript
const { createClient, login } = require('arubaos');

const client = createClient('10.11.12.13');

await login(client);

...
```

### logout

Logout a client.

#### Parameters

-   `client` **superagent.Agent** 

#### Examples

```javascript
const { createClient, login, logout } = require('arubaos');

const client = createClient('10.11.12.13');

await login(client);

...

await logout(client);
```

### useClient

Login a client, execute a function on the client, then logout the client.

#### Parameters

-   `client` **superagent.Agent** 
-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 
-   `username` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `process.env.ARUBA_OS_USERNAME||'admin'`)
-   `password` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `process.env.ARUBA_OS_PASSWORD||''`)

#### Examples

```javascript
const { createClient, useClient } = require('arubaos');

function getNodeHierarchy(client) {
  return client
    .get('/configuration/object/node_hierarchy');
}

useClient(createClient('10.11.12.13'), getNodeHierarchy)
 .then(console.log)
 .catch(console.error);
```

Returns **any** The return value of `fn`
