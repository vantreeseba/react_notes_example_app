import { graphql } from "react-apollo";
import gql from "graphql-tag";

import './index.css';

import React, {Component} from 'react';
import Note from '../note';

class NoteList extends Component {
  render() {
    const {getNotes} = this.props;

    if (getNotes.loading) {
      return null;
    }

    console.log(getNotes);

    return (
      <div className="note-list">
        {getNotes.notes.map(x => <Note note={x} />)}
      </div>
    );
  }
}

const GET_NOTES = gql`{ 
  notes @client {
    title
    description
    createdAt
    updatedAt
  }
}`;

export default graphql(GET_NOTES,{name: 'getNotes'})(NoteList);
