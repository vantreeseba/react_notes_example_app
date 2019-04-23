import gql from 'graphql-tag';

const GET_SHOW_ARCHIVED = gql` 
  {
    showArchived @client
  }
`;

export default GET_SHOW_ARCHIVED;
