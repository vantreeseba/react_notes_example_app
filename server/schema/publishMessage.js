const {pubsub} = require('../pubsub');

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
