import {graphql, compose} from "react-apollo";
import React, {Component} from 'react';
import {Modal, Form, Button} from 'semantic-ui-react';

import CREATE_NOTE from '../../graphql/createNote';

class EditNote extends Component {
  state = {
    open: false,
    title: '',
    description: ''
  };

  render() {
    const {trigger, note, createNote} = this.props;
    const {open, title, description} = this.state;

    const onCancelClick = () => this.setState({open: false});
    const onSaveClick = () => {
      createNote({
        variables: {title, description}
      });
      this.setState({open: false, title: '', description: ''});
    }

    const form = (
      <Form onSubmit={() => {
        createNote({variables: {title, description}})
        this.setState({open: false})
      }}>
        <Form.Input
          label="title"
          value={title}
          onChange={(_, {value}) => this.setState({title: value})} />
        <Form.TextArea
          label="description"
          value={description}
          onChange={(_, {value}) => this.setState({description: value})}
        />
      </Form>
    );

    return (
      <>
        <div onClick={() => this.setState({open: true})}>
          {trigger}
        </div>
        <Modal open={open}>
          <Modal.Header>
            {note ? 'Edit Note' : 'New Note'}
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

const wrapWithCreate = graphql(CREATE_NOTE, {
  name: 'createNote',
  options: {
    refetchQueries: ['GET_NOTES']
  }
});

export default compose(wrapWithCreate)(EditNote);
