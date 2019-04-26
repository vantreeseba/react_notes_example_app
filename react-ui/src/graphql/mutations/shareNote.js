import gql from 'graphql-tag';
import Note from '../fragments/note';

const SHARE_NOTE = gql` 
  ${Note}

  mutation ShareNote($_id: MongoID!, $sharedWith: [String] = []) {
    noteSetSharedWith(_id: $_id, sharedWith: $sharedWith) {
      recordId
      record {
        ...Note
      }
    }
  }
`;

export default SHARE_NOTE;
