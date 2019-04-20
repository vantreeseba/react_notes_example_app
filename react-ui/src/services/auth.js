import {createBrowserHistory} from 'history'
import auth0 from 'auth0-js';
const CALLBACK_URI = '';
const AUTH0_CLIENT_ID = '';
const AUTH0_DOMAIN = '';

class Auth {
  accessToken;
  idToken;
  expiresAt;
  isLoggedIn;
  constructor() {
    // this.auth0 = new auth0.WebAuth({
    //   domain: AUTH0_DOMAIN,
    //   clientID: AUTH0_CLIENT_ID,
    //   redirectUri: CALLBACK_URI,
    //   responseType: 'token id_token',
    //   scope: 'openid profile email'
    // });

    this.readFromLocalStorage();
  }

  login() {
    return this.auth0.authorize();
  }

  /**
   * Clear the local storage for auth.
   */
  clearLocalStorage() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
  }

  /**
   * Set all auth variables from localstorage.
   */
  readFromLocalStorage() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    this.expiresAt = localStorage.getItem('expiresAt');
    this.idToken = localStorage.getItem('idToken');
    this.accessToken = localStorage.getItem('accessToken');
  }

  /**
   * Write all vars in auth service to local storage.
   */
  writeToLocalStorage() {
    localStorage.setItem('isLoggedIn', this.isLoggedIn);
    localStorage.setItem('expiresAt', this.expiresAt);
    localStorage.setItem('idToken', this.idToken);
    localStorage.setItem('accessToken', this.accessToken);
  }

  handleAuthentication(callback) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, callback);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult, callback) {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.isLoggedIn = true;
    this.writeToLocalStorage();
    callback();
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout(callback) {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.isLoggedIn = false;
    this.clearLocalStorage();

    this.auth0.logout({
      return_to: window.location.origin
    });

    callback();
  }

  /**
   * Check if current user is authed.
   * @return {Boolean} Is the user authed.
   */
  isAuthenticated() {
    // return true;
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

export default new Auth();
