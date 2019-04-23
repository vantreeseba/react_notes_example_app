const {pubsub} = require('../pubsub');

function publishMessage(channel, resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].withMiddlewares([async (resolve, source, args, context, info) => {
      const res = await resolve(source, args, context, info);
      // if (k.toLowerCase().includes('remove')) {
      //   res.record._deleted = true;
      // }
      
      pubsub.publish(channel, {value: res.record});
      return res;
    }]);
  });

  return resolvers;
}

module.exports = publishMessage;
