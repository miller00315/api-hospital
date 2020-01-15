const blacklist = require('express-jwt-blacklist');
const passaport = require('passport');
const Profissionais = require('../../models/profissionais');

exports.loginProfissionais = async function(req, res, next) {
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

exports.getProfissionais = async function(_, res, next) {
  Profissionais.find(function(error, profissionais){
    if(error){
      res.status(404).send(error);
    } else {
      res.status(200).send(profissionais);
    }
  });
}

exports.createProfissionais = async function(req, res, next) {
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

  const finalProfessional = new Profissionais(profissional);
  
  finalProfessional.setPassword(profissional.password);

  return finalProfessional.save().then(
    function(){
      res.json({ profissional: finalProfessional.toAuthJSON()})
    }
  );
}

exports.logoutProfissionais = async function(req, res, next) {
  const { payload } = req;

  blacklist.revoke(payload, function(error) {
    if(error) {
      res.status(500).json({
        'status': 500,
        'data': error,
      });
    } else {
      res.status(200).json({
        'status': 200,
        'data': 'You are logged out',
      });
    }
  });
}

exports.getProfissionaisByParameter = async function(req, res, next) {
  let consulta = {};
  consulta[req.params.parametro] = new RegExp(req.params.valor,'i');

  Profissionais.find(consulta,
  function(erro, profissionais){
      if(erro){
        res.status(404).send(erro);
      } else {
        res.status(200).send(profissionais);
      }
  });
}

exports.currentProfessionais = async function(req, res, next) {
  const { payload: { id } } = req;

  Profissionais.findById(id, function(erro, profissional) {
    if(erro){
      res.status(401).send(erro);
    } else {
      res.status(200).send(profissional);
    }
  });
}

exports.deleteProfessionais = async function(req, res, next) {
  Profissionais.findByIdAndRemove(
    req.params.id_profissional,
    function(erro, resultado) {
      if(erro) {
        res.status(404).send(erro);
      } else {
        res.status(200).send(resultado);
      }
    }
  );
}

exports.invalidRoute = async function(_, res, next) {
  res.status(404).json({message: 'Rota inexistente'});
}

exports.routerError = async function(err, _, res, next) {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
}