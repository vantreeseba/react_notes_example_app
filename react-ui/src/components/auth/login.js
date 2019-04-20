import React, {Component} from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import Auth from '../../services/auth';

class Login extends Component {
  render() {
    if (Auth.isAuthenticated()) {
      return <Redirect from='/login' to='/' />
    }
    Auth.login();
    return null;
  }
}

export default Login;
