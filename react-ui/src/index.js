import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-boost';


import resolvers from './clientState/resolvers';
import initial from './clientState/initial';

const APP_URL = process.env.HEROKU_APP_NAME || 'localhost:3001';

const authLink = (operation) => {
  const token = localStorage.getItem('idToken');
  const headers = {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  };

  operation.setContext(headers)
};

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: `http://${APP_URL}/graphql`,
  request: authLink,
  cache,
  resolvers,
});
cache.writeData({
  data: initial
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
