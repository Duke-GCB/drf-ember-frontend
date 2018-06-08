import { moduleFor, test } from 'ember-qunit';
import EmberObject from '@ember/object';
import { resolve, reject } from 'rsvp';

moduleFor('controller:get-token', 'Unit | Controller | get token', {
  needs: ['service:session'],
});

const MockSession = EmberObject.extend({
  isAuthenticated: false,
  authenticate() { return resolve(); }
});

test('it exists', function(assert) {
  let controller = this.subject({
    session: MockSession.create(),
    transitionToRoute() {}
  });
  assert.ok(controller);
});

test('it authenticates with jwt-session-authenticator when not authenticated', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    authenticate(authenticator) {
      assert.equal(authenticator, 'authenticator:jwt-session-authenticator');
      return resolve();
    },
  });
  this.subject({
    session: session,
    transitionToRoute() {}
  });
});

test('it does not call authenticate() when session is authenticated', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    isAuthenticated: true,
    authenticate() { assert.fail(); },
  });
  this.subject({
    session: session,
    transitionToRoute() { assert.ok(true); }
  });
});

test('it transitions to failureRoute when authentication fails', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    authenticate() { return reject(); }
  });
  this.subject({
    failureRoute: '/failure',
    session: session,
    transitionToRoute(destination) {
      assert.equal(destination, '/failure');
    }
  });
});

test('it transitions to successRoute when authentication succeeds', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    authenticate() { return resolve(); },
  });
  this.subject({
    successRoute: '/success',
    session: session,
    transitionToRoute(destination) {
      assert.equal(destination, '/success');
    }
  });
});
