import gql from 'graphql-tag';

const GET_NOTE = gql` 
  fragment Note on Note {
    _id
    title
    description
    archived
    createdAt
    updatedAt
  }

  query GET_NOTE ($_id: MongoID){
    notes: noteById(_id: $_id) {
      ...Note
    }
  }
`;

export default GET_NOTE;
