import {graphql, compose} from "react-apollo";
import React, {Component} from 'react';
import {Confirm, Card, Icon} from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import ShareNoteModal from '../sharenotemodal';
import ARCHIVE_NOTE from '../../graphql/mutations/archiveNote';
import DELETE_NOTE from '../../graphql/mutations/deleteNote';

class Note extends Component {
  state = {
    deleteConfirmOpen: false,
    shareModalOpen: false
  }
  render() {
    const {note, deleteNote, archiveNote} = this.props;
    const {_id, title, description, createdAt, updatedAt, archived} = note;

    const onArchiveClick = () => archiveNote({variables: {_id, archived: !archived}});
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
            <ShareNoteModal
              trigger={<Icon name='share' />}
              note={note}
            />
            <Icon name={archived ? 'file archive' : 'file archive outline'} onClick={onArchiveClick} />
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

const wrapWithArchive = graphql(ARCHIVE_NOTE, {name: 'archiveNote'});
const WrapWithDelete = graphql(DELETE_NOTE, {name: 'deleteNote'});

export default compose(wrapWithArchive, WrapWithDelete)(Note);
