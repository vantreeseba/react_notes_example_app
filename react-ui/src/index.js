import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {WebSocketLink} from "apollo-link-ws";

import auth from './services/auth';
import App from './App';
import * as serviceWorker from './serviceWorker';
import resolvers from './clientState/resolvers';
import initial from './clientState/initial';
import cacheRedirects from './clientState/redirects';

const WS_URL = process.env.REACT_APP_URL;

const subclient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  connectionParams: () => {
    return {
      token: auth.idToken 
    }
  }
});

const cache = new InMemoryCache({
  cacheRedirects,
  dataIdFromObject: ({_id}) => _id,
  // addTypename: false
});
const client = new ApolloClient({
  networkInterface: subclient,
  cache,
  resolvers,
  connectToDevTools: true,
  link: new WebSocketLink(subclient)
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
