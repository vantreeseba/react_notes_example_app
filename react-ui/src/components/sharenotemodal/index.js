import gql from 'graphql-tag';
import {graphql, compose} from "react-apollo";
import React, {Component} from 'react';
import {Icon, Modal, Form, Button} from 'semantic-ui-react';

import withCache from '../../graphql/cache';
import SHARE_NOTE from '../../graphql/mutations/shareNote';

const noteSharedWith = gql`fragment noteSharedWith on Note { sharedWith }`;

class ShareNoteModal extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.setState({sharedWith: this.props.note.sharedWith});
  }

  render() {
    const {trigger, shareNote, cache, note} = this.props;
    const {title, _id, sharedWith} = note;
    const {open} = this.state;

    const onCancelClick = () => {
      cache.refetchQueries(['GET_NOTES']);
      this.setState({open: false})
    };
    const onSaveClick = () => {
      shareNote({variables: {_id, sharedWith: sharedWith.filter(x => x)}});
      this.setState({open: false});
    }
    const addShare = () => {
      cache.writeFragment({
        id: _id,
        fragment: noteSharedWith,
        data: {sharedWith: [...sharedWith, '']}
      });
    }

    const inputs = sharedWith.map((x, i) => {
      return (
        <Form.Input
          key={`shared_with_input_${i}`}
          placeholder="email"
          value={x}
          onChange={(_, {value}) => {
            sharedWith[i] = value;
            cache.writeFragment({
              id: _id,
              fragment: noteSharedWith,
              data: {sharedWith}
            })
          }}
        />
      );
    });

    const form = (
      <>
        <Form>
          {inputs}
        </Form>
        <br />
        <Button onClick={addShare}>
          <Icon name="plus" />
        </Button>
      </>
    );

    return (
      <>
        <span onClick={() => this.setState({open: true})}>
          {trigger}
        </span>
        <Modal open={open}>
          <Modal.Header>
            {`Share ${title} with:`}
          </Modal.Header>
          <Modal.Content>
            {form}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onCancelClick}>Cancel</Button>
            <Button positive onClick={onSaveClick}>Save</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

const wrapWithShare = graphql(SHARE_NOTE, {
  name: 'shareNote',
  options: {refetchQueries: ['GET_NOTES']}
});

export default compose(withCache, wrapWithShare)(ShareNoteModal);
