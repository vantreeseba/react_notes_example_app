const {pubsub} = require('../pubsub');

/**
 * Save a document as the current user.
 * @param {String} channel The channel to publish a message to. 
 * @param {Array} resolvers The list of resolvers to apply this to.
 * @return {Array} The modified resolvers.
 */
function publishMessage(channel, resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].withMiddlewares([async (resolve, source, args, context, info) => {
      const res = await resolve(source, args, context, info);
      pubsub.publish(channel, {value: res.record, args});
      return res;
    }]);
  });

  return resolvers;
}

module.exports = publishMessage;
