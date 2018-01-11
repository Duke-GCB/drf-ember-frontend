import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:drf-adapter', 'Unit | Adapter | drf adapter', {
  needs: ['service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it sends headers for application/vnd.rootobject+json', function(assert) {
  let adapter = this.subject();
  const headers = adapter.get('headers');
  const expectedType = 'application/vnd.rootobject+json';
  assert.equal(headers['Accept'], expectedType);
  assert.equal(headers['Content-type'], expectedType);
});

test('it computes API url paths as dasherized+pluralized from type names',function (assert) {
  let adapter = this.subject();
  const deliveryPath = adapter.pathForType('delivery');
  assert.equal(deliveryPath , 'deliveries');

  const projectPath = adapter.pathForType('duke-ds-project');
  assert.equal(projectPath, 'duke-ds-projects');

  const userPath = adapter.pathForType('duke-ds-user');
  assert.equal(userPath, 'duke-ds-users');
});

test('it computes isInvalid for status 400', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter.isInvalid(400));
  assert.notOk(adapter.isInvalid(401));
});
