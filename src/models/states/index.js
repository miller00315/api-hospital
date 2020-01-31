const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  value: String,
  title: String,
});

module.exports = mongoose.model('state', StateSchema);