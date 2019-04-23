import gql from 'graphql-tag';

const DELETE_NOTE = gql` 
  mutation DeleteNote($_id: MongoID!) {
    noteRemoveById(_id: $_id) {
      recordId
    }
  }
`;

export default DELETE_NOTE;
