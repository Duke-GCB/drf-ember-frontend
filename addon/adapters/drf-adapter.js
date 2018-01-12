import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'; // This is what causes the authorizer to be picked up
import { dasherize } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  /*
    This adapter is customized for running Django REST Framework
   */
  init() {
    this._super(...arguments);
    this.headers = {
      'Accept': 'application/vnd.rootobject+json',
      'Content-type': 'application/vnd.rootobject+json'
    };
  },
  authorizer: 'authorizer:drf-token-authorizer', // Adds token authorization to requests
  buildURL(modelName, id, snapshot, requestType, query) {
    var url = this._super(modelName, id, snapshot, requestType, query);
    // Enforce trailing slashes
    if (url.charAt(url.length - 1) !== '/') {
      url += '/';
    }
    return url;
  },
  /**
   * pathForType returns the path on the API server for the given model type
   * We override it here because Ember's default is to camelcase and pluralize
   * @param type
   */
  pathForType(type) {
    let dasherized = dasherize(type);
    let pluralized = pluralize(dasherized);
    return pluralized;
  },
  isInvalid(status) {
    return status === 400;
  },
});
