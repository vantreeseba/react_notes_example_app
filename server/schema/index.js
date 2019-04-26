const {withFilter} = require('apollo-server');
const {schemaComposer} = require('graphql-compose');
const NoteTC = require('../models/note/tc');
const {pubsub, NOTE_CHANGED_TOPIC} = require('../pubsub');

const loggedIn = require('./loggedIn');
const limitToUser = require('./limitToUser');
const saveAsUser = require('./saveAsUser');
const publishMessage = require('./publishMessage');

const buildDefaultQueries = (type, TC) => {
  return {
    [`${type}ById`]: TC.getResolver('findById'),
    [`${type}Many`]: TC.getResolver('findMany'),
    [`${type}Count`]: TC.getResolver('count'),

    // Unused, but here for later.
    // [`${type}One`]: TC.getResolver('findOne'),
    // [`${type}ByIds`]: TC.getResolver('findByIds'),
    // [`${type}Pagination`]: TC.getResolver('pagination'),
  };
};

const addDefaultMutations = (type, TC) => {
  return {
    [`${type}CreateOne`]: TC.getResolver('createOne'),
    [`${type}UpdateById`]: TC.getResolver('updateById'),
    [`${type}RemoveById`]: TC.getResolver('removeById'),

    // These are unused, but left here for later.
    // [`${type}`]: TC.getResolver('createMany'),
    // [`${type}`]: TC.getResolver('updateOne'),
    // [`${type}`]: TC.getResolver('updateMany'),
    // [`${type}`]: TC.getResolver('removeOne'),
    // [`${type}`]: TC.getResolver('removeMany'),
  };
};

schemaComposer.Query.addFields(
  {
    ...loggedIn(
      limitToUser(
        buildDefaultQueries('note', NoteTC)
      )
    )
  }
);
addDefaultMutations('note', NoteTC);

schemaComposer.Mutation.addFields({
  ...saveAsUser(
    publishMessage(NOTE_CHANGED_TOPIC, {
      ...addDefaultMutations('note', NoteTC),
      'noteSetArchived': NoteTC.getResolver('noteSetArchived'),
      'noteSetSharedWith': NoteTC.getResolver('noteSetSharedWith')
    })
  )
});

schemaComposer.Subscription.addFields({
  note_changed: {
    type: NoteTC,
    resolve: payload => {
      return payload.value;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator(NOTE_CHANGED_TOPIC),
      (payload, variables, context) => {
        let sharedWith = false;
        let isAuthor = false;
        if (payload.args && payload.args.sharedWith) {
          sharedWith = payload.args.sharedWith.includes(context.user);
        }

        if(payload.value.sharedWith) {
          sharedWith = sharedWith || payload.value.sharedWith.includes(context.user);
        }

        if(payload.value.author) {
          isAuthor = payload.value.author === context.user;
        }

        return isAuthor || sharedWith 
      }
    )
  }
})

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
