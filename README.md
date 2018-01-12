# drf-ember-frontend

Ember Addon for connecting to Django REST Framework APIs using [drf-ember-backend](https://github.com/Duke-GCB/drf-ember-backend).

Includes adapter, serializer, and authenticator classes:

## Installation

From another ember application:

* `ember install ember-drf-frontend`

## Usage:

Example adapter:

```
// app/adapters/application.js
import DRFAdapter from 'drf-ember-frontend/adapters/drf-adapter';

export default DRFAdapter.extend({
  host: 'http://127.0.0.1:8000',
  namespace: 'api/v2'
});
```

Example serializer:

```
// app/serializers/application.js
import DRFSerializer from 'drf-ember-frontend/serializers/drf-serializer';

export default DRFSerializer.extend();

```

## Development

```
git clone git@github.com:Duke-GCB/drf-ember-frontend.git
cd drf-ember-frontend
npm install
npm link
cd /to/hosting/application
npm link drf-ember-frontend
```

`npm link drf-ember-frontend` creates a symlink in the hosting application's `node_modules` directory, referring back to this addon's directory. The hosting ember application picks it up from there

Edit `package.json` in the hosting application, and add the following to the `devDependencies` array:

```
   "drf-ember-frontend": "*"
```

Notes:

- With `drf-ember-frontend` listed as a dependency in the hosting application, `npm install` will attempt to install it from npm. This will either fail (404) or overwrite the symlink with a version from npm.


## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

