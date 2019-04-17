import React, {Component} from 'react';
import {Menu, Icon} from 'semantic-ui-react';

class HeaderBarMenu extends Component {
  handleItemClick() {
    console.log('clicked');
  }

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

export default HeaderBarMenu;
