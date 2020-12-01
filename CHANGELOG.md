# Changelog

## 3.0.0
- Added: typescript support
- Added: this changelog
- Added: `createClient()` default value in `useClient`
- Changed: more thorough & clear documentation
- Changed: swapped `fn` & `client` parameter orders in `useClient` (breaking change)
- Removed: `disableTLSCerts()` from `createClient`
- Removed: `loginClient` & `logoutClient` documentation, as they're rarely used
- Removed: `superagent-prefix` package

# 3.0.1
- Changed: Improved npm scripts
- Changed: `docs:build` to `build:docs` script
- Removed: Unnessary `const { create } = require('domain');` from test script
