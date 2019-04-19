var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: String,
    description: String,
    archived: Boolean
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', schema);
