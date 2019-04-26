export default {
  Query: {
    NoteById: (_, args, {getCacheKey}) => {
      console.log('hitting cache??');
      return getCacheKey({__typename: 'Note', id: args._id})
    }
  },
};
