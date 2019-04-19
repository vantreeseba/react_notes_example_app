import './index.css';

import {graphql, compose} from "react-apollo";
import {Card} from 'semantic-ui-react';
import React, {Component} from 'react';

import Note from '../note';
import GET_SHOW_ARCHIVED from '../../graphql/getShowArchived';
import GET_NOTES from '../../graphql/getNotes';

class NoteList extends Component {
  render() {
    const {getNotes} = this.props;

    if (getNotes.loading) {
      return null;
    }

    console.log(getNotes);

    return (
      <Card.Group className="note-list">
        {getNotes.notes.map(x => <Note key={`note-${x._id}`} note={x} />)}
      </Card.Group>
    );
  }
}


const wrapWithShowArchive = graphql(GET_SHOW_ARCHIVED, {name: 'showArchived'});
const wrapWithGetNotes = graphql(GET_NOTES, {
  name: 'getNotes',
  options: props => {
    const {showArchived} = props.showArchived;
    return {
      variables: {showArchived}
    }
  }
})

export default compose(wrapWithShowArchive, wrapWithGetNotes)(NoteList);
