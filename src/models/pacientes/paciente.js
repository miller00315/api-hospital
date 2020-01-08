const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PacienteSchema = new Schema({
  nome: String,
  sobrenome: String,
  numeroProtocolo: String
});

module.exports = mongoose.model('pacientes', PacienteSchema);