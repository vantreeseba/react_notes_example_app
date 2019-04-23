import gql from 'graphql-tag';

const ARCHIVE_NOTE = gql` 
  fragment Note on Note {
    _id
    title
    description
    archived
    createdAt
    updatedAt
  }

  mutation ArchiveNote($_id: MongoID!) {
    noteSetArchived(_id: $_id) {
      recordId
      record {
        ...Note
      }
    }
  }
`;

export default ARCHIVE_NOTE;
