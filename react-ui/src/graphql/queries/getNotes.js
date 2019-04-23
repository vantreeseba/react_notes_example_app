import gql from 'graphql-tag';

const GET_NOTES = gql` 
  fragment Note on Note {
    _id
    title
    description
    archived
    createdAt
    updatedAt
  }

  query GET_NOTES ($showArchived: Boolean){
    notes: noteMany(filter: { 
      OR:[{archived: $showArchived}, {archived: false}]}
    ) 
    {
      ...Note
    }
  }
`;

export default GET_NOTES;
