const {rule, allow, deny, and, shield} = require('graphql-shield');

const loggedIn = rule({cache: 'contextual'})(
  async (parent, args, ctx, info) => {
    return ctx.user !== undefined;
  }
);

const isItemOwner = rule({
  cache: 'contextual',
})(async (parent, {_id}, ctx, info) => {
  const type = info.returnType.getFields().record.type;
  const model = ctx.db.models[type];
  const user = ctx.user;

  return await model.findOne({_id, author: user}) !== null;
});

module.exports = shield({
  Query: {
    '*': loggedIn
  },
  Mutation: {
    'noteCreateOne': loggedIn,
    '*': isItemOwner
  },
  Subscription: {
    '*': loggedIn
  }
});

// , {
// TODO: Figure out why this is applied to field within a query? (i.e. note.title).
// fallbackRule: deny
// });
