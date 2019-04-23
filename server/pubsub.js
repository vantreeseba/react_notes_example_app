const {PubSub} = require('graphql-subscriptions');

const pubsub = new PubSub();
const NOTE_CHANGED_TOPIC = 'note_changed';

module.exports = {
  pubsub,
  NOTE_CHANGED_TOPIC
};
