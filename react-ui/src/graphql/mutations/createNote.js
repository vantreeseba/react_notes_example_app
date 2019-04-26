import gql from 'graphql-tag';
import Note from '../fragments/note';

const CREATE_NOTE = gql` 
  ${Note}

  mutation CreateNote(
    $title: String,
    $description: String
    $archived: Boolean! = false
  ) {
    noteCreateOne(record: {
      title: $title
      description: $description
      archived: $archived
    }) {
      recordId
      record {
        ...Note
      }
    }
  }
`;

export default CREATE_NOTE;
