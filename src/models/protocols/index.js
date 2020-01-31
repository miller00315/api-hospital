const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProtocolSchema = new Schema({
  title: String,
  description: String,
  code: String,
  stages: Object,
});

module.exports = mongoose.model('protocol', ProtocolSchema);