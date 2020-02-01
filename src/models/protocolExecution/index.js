const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProtocolExcutionSchema = new Schema({
  patientId: String,
  isExecuting: Boolean,
  protocolCode: String,
  modules: Object,
  createdAt: Date,
  finishedAt: Date,
  restartedAt: Date,
  restartedBy: String,
  finishedBy: String,
  createdBy: String,
  updates: Array,
});

ProtocolExcutionSchema.methods.initialSetup = function() {
  this.createdAt = new Date();
  this.isExecuting = true;
  this.modules = {};
}

ProtocolExcutionSchema.methods.update = function(module, user) {
 // this.modules[`${module.code}`] = module;
  if(!this.modules)
    this.modules = {};

  let code = module.code;

  delete module['code'];
  
  this.modules[`${code}`] = module;
  this.updates.push({user: user, date: new Date()});
}

ProtocolExcutionSchema.finish = function(user) {
  this.finishedAt = new Date();
  this.isExecuting = false;
  this.finishedBy = user;
}

ProtocolExcutionSchema.restart = function(user) {
  this.restartedAt = new Date();
  this.isExecuting = true;
  this.restartedBy = user;
}

module.exports = mongoose.model('protocol_execution', ProtocolExcutionSchema);

