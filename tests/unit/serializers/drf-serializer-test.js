import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:drf-serializer', 'Unit | Serializer | drf serializer');

test('it computes keyForRelationship as underscored', function(assert) {
  let record = this.subject();
  const relationshipKey = record.keyForRelationship('fromUser');
  assert.equal(relationshipKey, 'from_user');
});

test('it computes keyForAttribute as underscored key', function(assert) {
  let record = this.subject();
  const attributeKey = record.keyForAttribute('transferId');
  assert.equal(attributeKey, 'transfer_id');
});

test('it computes payloadKeyFromModelName as pluralized', function(assert) {
  let record = this.subject();
  const payloadKey = record.payloadKeyFromModelName('delivery');
  assert.equal(payloadKey, 'deliveries');
});
