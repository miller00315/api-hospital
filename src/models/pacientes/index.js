const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: String,
  surname: String,
  register_by: String,
  protocol_number: String,
  genre: String,
  birth_date: String,
  register_date: Date,
  observation: String,
  register: String,
  address: {
    city: String,
    state: String,
  }
});

PatientSchema.methods.initialSetup = () => {
  console.log('teste');
  this.register_date = new Date();
}

module.exports = mongoose.model('patient', PatientSchema);