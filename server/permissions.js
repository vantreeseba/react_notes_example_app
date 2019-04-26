const {applyMiddleware} = require('graphql-middleware');
const {rule, allow, deny, shield} = require('graphql-shield');

// const loggedIn = rule({cache: 'contextual'})(
//   (parent, args, ctx, info) => {
//     return true;
//   }
// )

const permissions = shield({
  Query: {
    '*': allow,
    'noteMany': allow
  },
  Mutation: {
    '*': deny
  },
}, {
  fallbackRule: deny
});

module.exports = (schema) => {
  return applyMiddleware(schema, permissions);
};
