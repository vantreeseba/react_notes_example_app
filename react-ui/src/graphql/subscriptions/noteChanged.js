import gql from 'graphql-tag';

const NOTE_CHANGED = gql` 
  fragment Note on Note {
    _id
    title
    description
    archived
    createdAt
    updatedAt
  }

  subscription noteChanged {
    note: note_changed {
      ...Note
    }
  }
`;

export default NOTE_CHANGED;
