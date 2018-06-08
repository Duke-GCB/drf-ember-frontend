import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  successRoute: null,
  failureRoute: null,
  success() {
    this.transitionToRoute(this.get('successRoute'));
  },
  failure() {
    this.transitionToRoute(this.get('failureRoute'));
  },
  init() {
    this._super(...arguments);
    this.getToken();
  },
  getToken() {
    const authenticator = 'authenticator:jwt-session-authenticator'; // Find the authenticator that uses the session
    const credentials = {};
    const session = this.get('session');

    if(session.get('isAuthenticated')) {
      this.success();
    } else {
      session.authenticate(authenticator, credentials).then(this.success.bind(this), this.failure.bind(this));
    }
  }
});
