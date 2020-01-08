const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfisionalSchema = new Schema({
  nome: String,
  sobrenome: String,
  tipo: String
});

module.exports = mongoose.model('profissional', ProfisionalSchema);