import {graphql, compose} from "react-apollo";
import React, {Component} from 'react';
import {Confirm, Card, Icon} from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import ARCHIVE_NOTE from '../../graphql/archiveNote';
import DELETE_NOTE from '../../graphql/deleteNote';

class Note extends Component {
  state = {
    deleteConfirmOpen: false
  }
  render() {
    const {note, deleteNote, archiveNote} = this.props;
    const {_id, title, description, createdAt, updatedAt, archived} = note;

    const onArchiveClick = () => archiveNote({variables: {_id}});
    const onDeleteClick = () => this.setState({deleteConfirmOpen: true});
    const onCancel = () => this.setState({deleteConfirmOpen: false});
    const onConfirm = () => {
      deleteNote({variables: {_id}});
      this.setState({deleteConfirmOpen: false});
    }

    return (
      <>
        <Card>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="right">
            <span className='date'>
              {updatedAt === createdAt ? 'Created:' : 'Updated:'}
              <TimeAgo date={updatedAt} />
            </span>
            {archived ? null : <Icon name='edit' onClick={onArchiveClick} />}
            <Icon name='delete' onClick={onDeleteClick} />
          </Card.Content>
        </Card>
        <Confirm
          open={this.state.deleteConfirmOpen}
          cancelButton='Cancel'
          confirmButton='Delete'
          content={`Are you sure you want to delete the note: ${title}?`}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />

      </>
    );
  }
}

const wrapWithArchive = graphql(ARCHIVE_NOTE, {
  name: 'archiveNote',
  options: {
    refetchQueries: ['GET_NOTES'],
    awaitRefetchQueries: true
  }
});
const WrapWithDelete = graphql(DELETE_NOTE, {
  name: 'deleteNote',
  options: {
    refetchQueries: ['GET_NOTES'],
    awaitRefetchQueries: true
  }
});

export default compose(wrapWithArchive, WrapWithDelete)(Note);
