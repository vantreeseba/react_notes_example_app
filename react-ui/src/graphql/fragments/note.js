import gql from 'graphql-tag';

const noteFragment = gql`
fragment Note on Note {
  _id
  title
  description
  archived
  createdAt
  updatedAt
  sharedWith
}
`;

export default noteFragment;

