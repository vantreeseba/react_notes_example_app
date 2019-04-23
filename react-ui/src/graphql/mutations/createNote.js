import gql from 'graphql-tag';

const CREATE_NOTE = gql` 
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

export default CREATE_NOTE;
