import 'semantic-ui-css/semantic.min.css'
import './App.css';

import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {InMemoryCache, HttpLink} from 'apollo-boost';


import HeaderBarMenu from './components/header';
import NoteList from './components/notelist';

import resolvers from './clientState/resolvers';
import initial from './clientState/initial';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers,
});
cache.writeData({
  data: initial
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <HeaderBarMenu />
          <NoteList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
