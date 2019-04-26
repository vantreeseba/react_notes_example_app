import gql from 'graphql-tag';
import Note from '../fragments/note';

const GET_NOTE = gql` 
  ${Note}

  query GET_NOTE ($_id: MongoID!){
    note: noteById(_id: $_id) { ...Note }
  }
`;

export default GET_NOTE;
