import './index.css';

import {graphql, compose} from "react-apollo";
import {Card, Dimmer, Loader} from 'semantic-ui-react';
import React, {Component} from 'react';

import Note from '../note';
import GET_SHOW_ARCHIVED from '../../graphql/queries/getShowArchived';
import GET_NOTES from '../../graphql/queries/getNotes';
import NOTE_CHANGED from '../../graphql/subscriptions/noteChanged';


class NoteList extends Component {
  render() {
    const {getNotes} = this.props;

    if (getNotes.loading) {
      return <Dimmer active><Loader /></Dimmer>;
    }

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
});
const wrapWithNoteUpdateSubscription = graphql(NOTE_CHANGED, {
  name: 'noteChanged',
  options: props => {
    return {
      onSubscriptionData: ({client, subscriptionData}) => {
        // Can refetch whole query, or set specific data in queries where filtered. 
        // In this case, it only changes when note becomes archived. 
        // Otherwise, it will automatically update the cached item correctly.
        //
        // (The note itself is updated, but apollo cannot update the query with a filter, so we
        // must do it.)
        props.getNotes.refetch();

        console.log('got that subscription');

        // let note = subscriptionData.data.note; 
        // if(note.archived) {
        //   const query = {query: GET_NOTES, variables: {showArchived: false}};
        //   let prev = client.readQuery(query);
        //   let notes = prev.notes
        //     .map(x => x._id === note._id ? note : x)
        //     .filter(x => !x.archived);

        //   client.writeQuery({...query, data: {notes}});
        // }
        
        // console.log('cache', client.cache)


        // TODO: Currently deletion does not work.
        // if(note._deleted){
        //   console.log('deleteing from cache');
        //   client.cache.data.delete(client.cache.config.dataIdFromObject(note));
        // }

        // console.log('got a note from the server that was updated', note);
      }
    }
  }
});

export default compose(wrapWithShowArchive, wrapWithGetNotes, wrapWithNoteUpdateSubscription)(NoteList);
