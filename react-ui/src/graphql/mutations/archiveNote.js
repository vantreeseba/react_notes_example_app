import gql from 'graphql-tag';
import Note from '../fragments/note';

const ARCHIVE_NOTE = gql` 
  ${Note}

  mutation ArchiveNote($_id: MongoID!, $archived: Boolean) {
    noteSetArchived(_id: $_id, archived: $archived) {
      recordId
      record {
        ...Note
      }
    }
  }
`;

export default ARCHIVE_NOTE;
