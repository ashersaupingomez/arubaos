# arubaos

Superagent utilities for interacting with the ArubaOS REST API.

* Super lightweight
* Simple API
* Based on [superagent's `Agent` class](https://visionmedia.github.io/superagent/#agents-for-global-state)
* Works with environment variables by default

## Installation

```bash
$ npm install arubaos
```

## Usage

```javascript
import { useClient } from 'arubaos';

function requestGetHostname(client) {
  return client
    .query({ command: 'show hostname' })
    .get('/configuration/showcommand');
}

const response = await useClient({ fn: requestGetHostname });
```

## Testing

Tests are performed on an actual ArubaOS controller whose credentials are defined by environment variables.

```bash
$ ARUBA_OS_HOST=... npm test
```
