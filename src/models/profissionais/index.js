const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const ProfisionalSchema = new Schema({
  nome: String,
  sobrenome: String,
  tipo: String,
  hash: String,
  salt: String,
  email: String,
  token: String,
}, {
  usePushEach: true
});

ProfisionalSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

ProfisionalSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

ProfisionalSchema.methods.generateJWT = function() {

  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  const token = jwt.sign({
    jti: this.id +'_'+randtoken.generate(6),
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, global.gConfig.jwt_key);

  return token;
}

ProfisionalSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.token,
    tipo: this.tipo,
    nome: this.nome,
    sobrenome: this.sobrenome,
  };
};

module.exports = mongoose.model('profissional', ProfisionalSchema);