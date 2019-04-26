import gql from 'graphql-tag';
import Note from '../fragments/note';

const ADD_NOTE = gql` 
  ${Note}

  mutation AddNote($title: String = "", $description: String = "") {
    noteCreateOne(record: {title: $title, description: $description}) {
      record {
        ...Note
      }
    }
  }
`;

export default ADD_NOTE;
