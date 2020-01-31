const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  value: String,
  title: String,
  stateInitials: String,
  stateCode: String,
});

module.exports = mongoose.model('city', CitySchema);
