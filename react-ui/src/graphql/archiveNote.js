import gql from 'graphql-tag';

const ARCHIVE_NOTE = gql` 
  mutation ArchiveNote($_id: MongoID!) {
    noteSetArchived(_id: $_id) {
      recordId
      record {
        _id
        title
        description
        archived
        createdAt
        updatedAt
      }
    }
  }
`;

export default ARCHIVE_NOTE;
