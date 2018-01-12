import { isEmpty } from '@ember/utils';
import { resolve, reject } from 'rsvp';
import { moduleFor, test } from 'ember-qunit';

moduleFor('authenticator:drf-token-authenticator', 'Unit | Authenticator | DRF Token Authenticator', {
  unit: true
});

test('restore resolves with credentials when data.token has data', function(assert) {
  let authenticator = this.subject();
  const done = assert.async();
  const tokenData = {token: 'abc123'};
  const resolved = (data) => {
    assert.deepEqual(tokenData, data);
    done();
  };
  authenticator.restore(tokenData).then(resolved);
});

test('restore rejects when data.token has no data', function(assert) {
  let authenticator = this.subject();
  const done = assert.async();
  const tokenData = {};
  const resolved = () => {
    assert.notOk(true);
    done();
  };
  const rejected = () => {
    assert.ok(true);
    done();
  };
  authenticator.restore(tokenData).then(resolved, rejected);
});

test('authenticate makes ajax POST to /api-auth-token/ with username and password', function(assert) {
  assert.expect(4);
  const tokenData = {token:'abc123'};
  const done = assert.async();
  const mockAjax = function(params) {
    const parsedData = JSON.parse(params['data']);
    assert.equal(params['url'], 'http://testhost/api-auth-token/');
    assert.equal(params['type'], 'POST');
    assert.equal(parsedData['username'], 'jsmith');
    assert.equal(parsedData['password'], 'secret');
    return resolve(tokenData);
  };
  let authenticator = this.subject({authTokenUrl: 'http://testhost/api-auth-token/', ajax: mockAjax});
  authenticator.authenticate('jsmith', 'secret').then(done);
});

test('authenticate extracts token on successful POST to /api-auth-token/ ', function(assert) {
  const tokenData = {token:'abc123'};
  const done = assert.async();
  const mockAjax = function() { return resolve(tokenData); };
  let authenticator = this.subject({ajax: mockAjax});
  authenticator.authenticate('jsmith', 'secret').then((token) => {
    assert.deepEqual(token, tokenData);
    done();
  });
});

test('authenticate handles errors from POST to /api-auth-token/ ', function(assert) {
  const done = assert.async();
  const mockAjax = function() { return reject({responseText: 'Bad Auth'}, 401); };

  const resolved = () => {
    assert.notOk(true); // Should not resolve
    done();
  };
  const rejected = (error) => {
    assert.equal(error, 'Bad Auth');
    done();
  };

  let authenticator = this.subject({ajax: mockAjax});
  authenticator.authenticate('jsmith', 'secret').then(resolved, rejected);
});

test('invalidate deletes the token from data when present', function(assert) {
  assert.expect(2);
  let authenticator = this.subject();
  const done1 = assert.async();
  const data = {token: 'def456'};
  authenticator.invalidate(data).then((resolvedData) => {
    assert.ok(isEmpty(resolvedData.token));
    done1();
  });

  const done2 = assert.async();
  const empty = {};
  authenticator.invalidate(empty).then(null, () => {
    assert.ok(true);
    done2();
  })
});
