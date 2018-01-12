import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('authorizer:drf-token-authorizer', 'Unit | Authorizer | DRF Token Authorizer', {
  unit: true,
  needs: ['service:session'],
});

test('it authorizes with token when session isAuthenticated', function(assert) {
  let authorizer = this.subject({
    session: EmberObject.create({ isAuthenticated: true })
  });
  const tokenData = {token: 'auth-token'};
  const headerBlock = (key, value) => {
    assert.equal(key, 'Authorization');
    assert.equal(value, 'Token auth-token');
  };
  authorizer.authorize(tokenData, headerBlock);
});

test('it authorizes with token when session is not authenticated', function(assert) {
  assert.expect(0);
  let authorizer = this.subject({
    session: EmberObject.create({ isAuthenticated: false })
  });
  const tokenData = {token: 'auth-token'};
  const headerBlock = (/* key, value */) => {
    assert.notOk(true); // should not call this!
  };
  authorizer.authorize(tokenData, headerBlock);
});
