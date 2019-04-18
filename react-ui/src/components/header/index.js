import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import {notes} from '../../state/actions';

class HeaderBarMenu extends Component {
  render() {
    return (
      <Menu fixed="top">
        <Menu.Item
          header
          onClick={this.handleItemClick}
        >
          <Icon name="book" />
          Notes
        </Menu.Item>

        <Menu.Item
          onClick={this.handleItemClick}
        >
          <Icon name="edit" />
          New Note
        </Menu.Item>
      </Menu>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewClick: dispatch(notes.add())
  }
};

export default connect(null, mapDispatchToProps)(HeaderBarMenu);
