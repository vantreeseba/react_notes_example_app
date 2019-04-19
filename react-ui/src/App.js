import 'semantic-ui-css/semantic.min.css'
import './App.css';

import React, {Component} from 'react';
import HeaderBarMenu from './components/header';
import NoteList from './components/notelist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBarMenu />
        <NoteList />
      </div>
    );
  }
}

export default App;
