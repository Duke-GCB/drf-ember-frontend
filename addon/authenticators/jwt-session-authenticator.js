import config from 'ember-get-config';
import JWTAuthenticator from 'drf-ember-frontend/authenticators/jwt-authenticator';
import { inject } from '@ember/service';

const JWTSessionAuthenticator = JWTAuthenticator.extend({
  cookies: inject('cookies'),
  init() {
    this._super(...arguments);
    const conf = config['ember-simple-auth-token'] || {};
    this.serverTokenEndpoint = conf.serverTokenSessionEndpoint || '/api/token-session/';
    // This authenticator needs to include the CSRF token
    const csrftoken =  this.get('cookies').read('csrftoken');
    this.headers['X-CSRFTOKEN'] = csrftoken;
  },
});

export default JWTSessionAuthenticator;
