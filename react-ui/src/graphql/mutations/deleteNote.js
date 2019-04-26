import gql from 'graphql-tag';
import Note from '../fragments/note';

const DELETE_NOTE = gql` 
  ${Note}

  mutation DeleteNote($_id: MongoID!) {
    noteRemoveById(_id: $_id) {
      recordId
      record { ...Note }
    }
  }
`;

export default DELETE_NOTE;
