import gql from 'graphql-tag';
import Note from '../fragments/note';

const NOTE_CHANGED = gql` 
  ${Note}

  subscription noteChanged {
    note: note_changed {...Note}
  }
`;

export default NOTE_CHANGED;
