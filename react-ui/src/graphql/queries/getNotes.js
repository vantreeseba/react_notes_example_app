import gql from 'graphql-tag';
import Note from '../fragments/note';

const GET_NOTES = gql`
  ${Note}

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
