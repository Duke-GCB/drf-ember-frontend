import { moduleFor, test } from 'ember-qunit';

moduleFor('authenticator:jwt-authenticator', 'Unit | Authenticator | DRF Token Authenticator', {
  unit: true
});

test('it exists', function(assert) {
  let authenticator = this.subject();
  assert.ok(authenticator);
});
