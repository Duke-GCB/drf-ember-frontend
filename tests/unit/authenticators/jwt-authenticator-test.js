import { moduleFor, test } from 'ember-qunit';

moduleFor('authenticator:jwt-authenticator', 'Unit | Authenticator | JWT Authenticator', {
  unit: true,
  needs: ['service:cookies']
});

test('it exists', function(assert) {
  let authenticator = this.subject();
  assert.ok(authenticator);
});
