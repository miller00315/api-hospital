const blacklist = require('express-jwt-blacklist');
const passaport = require('passport');
const Profissionais = require('../../models/profissionais');

exports.profissionaisLogin = async function(req, res, next) {
  const {body: {profissional}} = req;

  if(!profissional.email) {
    return res.status(422).json({
      email: 'precisamos de um email',
    });
  }

  if(!profissional.password) {
    return res.status(422).json({
      password: 'precisamos de uma senha',
    });
  }

  return passaport.authenticate(
    'local', {session: false}, function (erro, passaportProfessional, info) {
      if(erro) {
        return next(erro);
      }

      if(passaportProfessional) {
        const profissional = passaportProfessional;
        profissional.token = passaportProfessional.generateJWT();

        return res.json({professional: profissional.toAuthJSON()})
      }

      return  res.status(400).info;
    })(req, res, next);

}

exports.getProfissionais = async function(req, res, next) {
  Profissionais.find(function(error, profissionais){
    if(error){
      res.status(404).send(error);
    } else {
      res.status(200).send(profissionais);
    }
  });
}