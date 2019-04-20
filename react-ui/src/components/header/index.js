import {graphql, compose} from "react-apollo";
import React, {Component} from 'react';
import {Menu, Icon, Checkbox} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

import EditNoteModal from '../editnotemodal';
import Auth from '../../services/auth';

import GET_SHOW_ARCHIVED from '../../graphql/getShowArchived';
import TOGGLE_SHOW_ARCHIVED from '../../graphql/toggleShowArchived';
import GET_NOTES from '../../graphql/getNotes';

class HeaderBarMenu extends Component {
  render() {
    const {showArchived, toggleArchive} = this.props;

    if(showArchived.loading || toggleArchive.loading) {
      return null;
    }

    return (
      <Menu fixed="top">
        <Menu.Item
          header
          onClick={this.handleItemClick}
        >
          <Icon name="book" />
          Notes
        </Menu.Item>

        <EditNoteModal trigger={
          <Menu.Item>
            <Icon name="edit" />
            New Note
          </Menu.Item>
        } />
        <Menu.Item
          onClick={() => toggleArchive({variables: {showArchived: !showArchived.showArchived}})}
        >
          <Checkbox label="Show Archived" checked={showArchived.showArchived} />
        </Menu.Item>
        <Menu.Item
          position="right"
          onClick={() => Auth.logout(() => this.props.history.replace('/'))}
        >
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}

const wrapWithShowArchive = graphql(GET_SHOW_ARCHIVED, {name: 'showArchived'});
const WrapWithToggleArchive = graphql(TOGGLE_SHOW_ARCHIVED, {
  name: 'toggleArchive',
  options: props => ({
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        showArchived: props.showArchived.showArchived
      }
    }],
    awaitRefetchQueries: true
  })
});

export default compose(wrapWithShowArchive, WrapWithToggleArchive, withRouter)(HeaderBarMenu);

