import React, {Component} from 'react';
import {Card, Icon} from 'semantic-ui-react';

class Note extends Component {
  render() {
    const {title, description, createdAt, updatedAt} = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>Note Title</Card.Header>
          <Card.Meta>
            <span className='date'>Created: 05/05/19</span>
          </Card.Meta>
          <Card.Description>Note Description</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Icon name='edit' />
          <Icon name='delete' />
        </Card.Content>
      </Card>
    );
  }
}

export default Note;
