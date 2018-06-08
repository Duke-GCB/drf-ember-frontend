import { moduleFor, test } from 'ember-qunit';
import EmberObject from '@ember/object';

moduleFor('authenticator:jwt-session-authenticator', 'Unit | Authenticator | JWT Session Authenticator', {
  unit: true,
  needs: ['service:cookies']
});

test('it exists', function(assert) {
  let authenticator = this.subject();
  assert.ok(authenticator);
});

test('it adds csrftoken to headers', function(assert) {
  assert.expect(2);
  let authenticator = this.subject({
    cookies: EmberObject.create({
      read(key) {
        assert.equal(key, 'csrftoken');
        return 'csrf-token-123';
      }
    })
  });
  assert.deepEqual(authenticator.get('headers'), {'X-CSRFTOKEN': 'csrf-token-123'});
});
