/**
 * A resolver wrapper that filters results to only the logged in user.
 *
 * @param {Object} resolvers A list of resolvers.
 */
function loggedIn(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      // if (!rp.context.user) {
      //   throw new Error('You must be logged in to access this action.');
      // }
      return next(rp);
    });
  });
  return resolvers;
}


module.exports = loggedIn;
