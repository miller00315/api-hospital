const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  title: String,
  initials: String,
  code: String,
});

module.exports = mongoose.model('state', StateSchema);