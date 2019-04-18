export default {
  Mutation: {
    addNote: (_, {note}, {cache}) => {
      cache.writeData({data: {note}});
      return null;
    }
  }
};
