const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProtocolExcutionSchema = new Schema({
  patient_id: String,
  is_executing: Boolean,
  protocols: Object,
});

module.exports = mongoose.model('protocol_execution', ProtocolExcutionSchema);


//Criar um novo (post)
//adcionar protocolos a ele
//editar protocolos
//excluir informação
//is executing form false não pode mais alterar
//inserir protocolos novos 
