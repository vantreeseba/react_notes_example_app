const {composeWithMongoose} = require('graphql-compose-mongoose');
const model = require('./model');

const typeComposer = composeWithMongoose(model, {});

typeComposer.addResolver({
  kind: 'mutation',
  name: 'noteSetArchived',
  args: {_id: {type: 'MongoID'}, archived: {type: 'Boolean'}},
  type: typeComposer.getResolver('updateOne').getType(),
  resolve: async ({args}) => {
    const {_id, archived} = args;
    return {
      recordId: _id,
      record: await model.findByIdAndUpdate(_id, {$set: {archived}}, {new: true})
    };
  }
});

typeComposer.addResolver({
  kind: 'mutation',
  name: 'noteSetSharedWith',
  args: {_id: {type: 'MongoID'}, sharedWith: {type: '[String]'}},
  type: typeComposer.getResolver('updateOne').getType(),
  resolve: async ({args}) => {
    const {_id, sharedWith} = args;
    return {
      recordId: _id,
      record: await model.findByIdAndUpdate(_id, {$set: {sharedWith}}, {new: true})
    };
  }
});

module.exports = typeComposer;
