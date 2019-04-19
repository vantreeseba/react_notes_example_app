import gql from 'graphql-tag';

const GET_NOTES = gql` 
  query GET_NOTES ($showArchived: Boolean){
    notes: noteMany(filter:{ OR:[{archived: $showArchived}, {archived: false}]}) {
      _id
      title
      description
      archived
      createdAt
      updatedAt
    }
  }
`;

export default GET_NOTES;
