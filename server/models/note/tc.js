const {composeWithMongoose} = require('graphql-compose-mongoose');
const model = require('./model');

const typeComposer = composeWithMongoose(model, {});

typeComposer.addResolver({
  kind: 'mutation',
  name: 'noteSetArchived',
  args: {_id: {type: 'MongoID'}},
  type: typeComposer.getResolver('updateOne').getType(),
  resolve: async ({args}) => {
    return {
      recordId: args._id,
      record: await model.findByIdAndUpdate(args._id, {$set: {archived: true}})
    };
  }
});

module.exports = typeComposer;
