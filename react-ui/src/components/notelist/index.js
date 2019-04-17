import './index.css';

import React, { Component } from 'react';
import Note from '../note'; 

class NoteList extends Component {
  render() {
    const noteData = {
      title: 'Title',
      description: 'Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const notes= new Array(10);
    notes.fill(noteData, 0, 10);
    console.log(notes);
    const noteList = notes.map(x => <Note note={x} />);

    return (
      <div className="note-list">
        {noteList}
      </div>
    );
  }
}

export default NoteList;
