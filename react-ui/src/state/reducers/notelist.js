// TODO: make this got from db
const noteData = {
  title: 'Title',
  description: 'Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const notes = new Array(10);
notes.fill(noteData, 0, 10);

const initial = {
  notes,
};
// const initial = {
//   notes: [],
// };

const reducers = {
  add: (state, value) => {
    return {...state, notes: [...state.notes, value]};
  },
  remove: (state, value) => {
    return {...state, notes: state.notes.filter((_, i) => i !== value)};
  },
  update: (state, value) => {
    const oldNote = state.notes.find(x => x === value.index);
    const newNote = {...oldNote, ...value.note};

    return {...state, notes: [...state.notes.filter((_, i) => i !== value.index), newNote]};
  }
}

export default {initial, reducers};

