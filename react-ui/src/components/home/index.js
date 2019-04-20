import React, {Component} from 'react';
import HeaderBarMenu from '../header';
import NoteList from '../notelist';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <HeaderBarMenu />
        <NoteList />
      </div>
    );
  }
}

export default Home;
