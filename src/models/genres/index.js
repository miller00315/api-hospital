const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  code: String,
  title: String,
});

module.exports = mongoose.model('genre', GenreSchema);