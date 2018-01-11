import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  _keyFor(key) {
    let underscored = underscore(key);
    return underscored;
  },
  keyForRelationship(key /*, relationship */) {
    return this._keyFor(key);
  },
  keyForAttribute(attr) {
    return this._keyFor(attr);
  },
  payloadKeyFromModelName(modelName) {
    return pluralize(modelName);
  }
});
