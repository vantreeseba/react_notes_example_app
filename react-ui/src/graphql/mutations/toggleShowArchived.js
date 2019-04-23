import gql from 'graphql-tag';

const TOGGLE_SHOW_ARCHIVED = gql` 
  mutation TOGGLE_SHOW_ARCHIVED($showArchived: Boolean) @client{
    toggleShowArchived(showArchived: $showArchived) @client
  }
`;

export default TOGGLE_SHOW_ARCHIVED;
