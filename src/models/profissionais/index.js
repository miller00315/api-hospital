const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const ProfessionalSchema = new Schema({
  name: String,
  surname: String,
  type: String,
  hash: String,
  salt: String,
  email: String,
  token: String,
  createdAt: Date,
});

ProfessionalSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  this.createdAt = new Date();
};

ProfessionalSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

ProfessionalSchema.methods.generateJWT = function() {

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

ProfessionalSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.token,
    type: this.type,
    name: this.name,
    surname: this.surname,
  };
};

module.exports = mongoose.model('professional', ProfessionalSchema);