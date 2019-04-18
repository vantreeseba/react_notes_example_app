import './index.css';

import {connect} from 'react-redux';
import React, {Component} from 'react';
import Note from '../note';

class NoteList extends Component {
  render() {
    const {notes} = this.props;

    return (
      <div className="note-list">
        {notes.map(x => <Note note={x} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  }
}

export default connect(mapStateToProps)(NoteList);
