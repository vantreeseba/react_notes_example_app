// import gql from 'graphql-tag';

export default {
  Mutation: {
    toggleShowArchived: (_, {showArchived}, {cache}) => {
      cache.writeData({
        data: {
          showArchived
        }
      });
    }
  }
};
