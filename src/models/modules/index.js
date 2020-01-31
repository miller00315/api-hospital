const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  code: String,
  title: String,
  values: Object,
});

module.exports = mongoose.model('module', ModuleSchema);