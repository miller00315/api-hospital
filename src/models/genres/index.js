const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  value: String,
  title: String,
});

module.exports = mongoose.model('genre', GenreSchema);