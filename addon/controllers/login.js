import Controller from '@ember/controller';
import { inject } from '@ember/service';
import config from 'ember-get-config';

export default Controller.extend({
  session: inject('session'),
  isDevelopmentMode: config['environment']=== 'development',
  authorizeUrl: config['APP']['AUTHORIZE_URL'],
  actions: {
    authenticate() {
      // Now using JWT
      const authenticator = 'authenticator:jwt-authenticator'; // Causes JWT authenticator to be used
      const credentials = this.getProperties('username', 'password');
      this.get('session').authenticate(authenticator, credentials).catch((reason) => {
        this.set('errorMessage', reason);
      });
    }
  }
});
