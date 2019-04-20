import 'semantic-ui-css/semantic.min.css'
import './App.css';

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';

import Auth from './services/auth';
import Home from './components/home';
import Login from './components/auth/login';
import Callback from './components/auth/callback';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' exact render={() => {
            if (!Auth.isAuthenticated()) {
              return <Redirect from="/" to="login"/>
            }
            return <Home />;
          }} />
          <Route path='/login' component={Login} />
          <Route path='/callback' component={Callback} />
          </div>
      </Router>
    );
  }
}

export default App;
