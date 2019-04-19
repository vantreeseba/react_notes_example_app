const {schemaComposer} = require('graphql-compose');
const NoteTC = require('./models/note/tc');

const addDefaultQueries = (type, TC) => {
  schemaComposer.Query.addFields({
    [`${type}ById`]: TC.getResolver('findById'),
    [`${type}ByIds`]: TC.getResolver('findByIds'),
    [`${type}One`]: TC.getResolver('findOne'),
    [`${type}Many`]: TC.getResolver('findMany'),
    [`${type}Count`]: TC.getResolver('count'),
    [`${type}Pagination`]: TC.getResolver('pagination'),
  });
};

const addDefaultMutations = (type, TC) => {
  schemaComposer.Mutation.addFields({
    [`${type}CreateOne`]: TC.getResolver('createOne'),
    // [`${type}`]: TC.getResolver('createMany'),
    [`${type}UpdateById`]: TC.getResolver('updateById'),
    // [`${type}`]: TC.getResolver('updateOne'),
    // [`${type}`]: TC.getResolver('updateMany'),
    [`${type}RemoveById`]: TC.getResolver('removeById'),
    // [`${type}`]: TC.getResolver('removeOne'),
    // [`${type}`]: TC.getResolver('removeMany'),
  });
};

addDefaultQueries('note', NoteTC);
addDefaultMutations('note', NoteTC);

schemaComposer.Mutation.addFields({
  'noteSetArchived': NoteTC.getResolver('noteSetArchived')
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
