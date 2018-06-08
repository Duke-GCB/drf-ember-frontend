import { moduleFor, test } from 'ember-qunit';
import EmberObject from '@ember/object';
import { resolve, reject } from 'rsvp';
import { run } from '@ember/runloop';

moduleFor('controller:login', 'Unit | Controller | login', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it calls authenticator.authenticate()', function(assert) {
  assert.expect(1);
  let controller = this.subject({
      session: EmberObject.create({
        authenticate() {
          assert.ok(true);
          return resolve();
        }
      })
    });
    controller.send('authenticate')
});

test('it sets errorMessage when authenticator.authenticate() fails', function(assert) {
  let controller = this.subject({
    session: EmberObject.create({
      authenticate() { return reject('failed to authenticate'); }
    })
  });
  run(() => {
    controller.send('authenticate');
  });
  assert.equal(controller.get('errorMessage'), 'failed to authenticate');
});
