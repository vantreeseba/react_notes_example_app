import gql from 'graphql-tag';

const ADD_NOTE = gql` 
  mutation AddNote($title: String = "", $description: String = "") {
    noteCreateOne(record: {title: $title, description: $description}) {
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

export default ADD_NOTE;
