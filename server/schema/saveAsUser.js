/**
 * Save a document as the current user.
 * @param {Array} resolvers The list of resolvers to apply this to.
 * @return {Array} The modified resolvers.
 */
function saveAsUser(resolvers) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k] = resolvers[k].wrapResolve(next => rp => {
      if (rp.args.record) {
        rp.args.record.author = rp.context.user;
      }
      return next(rp);
    });
  });

  return resolvers;
}

module.exports = saveAsUser;
