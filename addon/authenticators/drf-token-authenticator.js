/**
 */

import { run } from '@ember/runloop';

import { isEmpty } from '@ember/utils';
import { Promise as EmberPromise } from 'rsvp';
import $ from 'jquery';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  authTokenUrl: '',
  ajax: $.ajax,
  // These are expected to return promises
  restore(data) {
    // resolve if data.token is not empty, otherwise reject
    // copied from https://www.smallsurething.com/making-ember-and-django-play-nicely-together-a-todo-mvc-walkthrough/
    return new EmberPromise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  /**
   * Only used in development, production expects the web auth server to create the cookie .
   */
  authenticate(username, password) {
    // resolve with object containing token if successful, reject if not
    return new EmberPromise((resolve, reject) => {
      // Make an ajax call
      const ajax = this.get('ajax');
      ajax({
        url: this.get('authTokenUrl'),
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json',
        dataType: 'json'
      }).then((response) => {
        run(function() {
          resolve({
            token: response.token
          });
        });
      }, (xhr, status) => {
        let response = xhr.responseText || status;
        run(function() {
          reject(response);
        });
      });
    });
  },

  invalidate(data) {
    return new EmberPromise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        delete data.token;
        resolve(data);
      } else {
        reject();
      }
    });
  }
});
