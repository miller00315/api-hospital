const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StageSchema = new Schema({
  title: String,
  code: String,
  module: String,
});

module.exports = mongoose.model('stage', StageSchema);