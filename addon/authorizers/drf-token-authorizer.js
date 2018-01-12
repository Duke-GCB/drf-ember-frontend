import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: service('session'),
  authorize(data, block) {
    if(this.get('session.isAuthenticated') && !isEmpty(data.token)) {
      block('Authorization', 'Token ' + data.token);
    }
  }
});
