/**
 * A resolver wrapper that filters results to only the logged in user.
 * @param {Object} resolvers A list of resolvers.
 * @return {Array} The modified resolvers.
 */
function limitToUser(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      if (!rp.context.user) {
        // throw new Error('Must be logged in to access this action.');
        return next(rp);
      }

      const userFilter = {
        AND: [{
          OR: [{
            author: rp.context.user,
          }, {
            sharedWith: rp.context.user
          }]
        }]
      };
      

      if (rp.args.filter && rp.args.filter.AND) {
        rp.args.filter.AND = {...rp.args.filter.AND, ...userFilter};
      } else {
        rp.args.filter = {...rp.args.filter, ...userFilter};
      }

      return next(rp);
    });
  });
  return resolvers;
}

module.exports = limitToUser;
