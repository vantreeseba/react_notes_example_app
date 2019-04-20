import React, {Component} from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import Auth from '../../services/auth';

class Callback extends Component {
  render() {
    Auth.handleAuthentication(() => {
      this.props.history.replace('/');

      //TODO: Write user to local cache.
    });

    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }
}

export default withRouter(Callback);
