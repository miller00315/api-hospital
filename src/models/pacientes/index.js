const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PacienteSchema = new Schema({
  name: String,
  surname: String,
  protocol_number: String,
  genre: String,
  birth_date: Date,
  register_date: Date,
  observation: String,
  register: String,
  address: {
    city: String,
    state: String,
  }
});

module.exports = mongoose.model('pacientes', PacienteSchema);