const blacklist = require('express-jwt-blacklist');
const passaport = require('passport');
const Profissionais = require('../../models/profissionais');
const _ = require('lodash');

exports.loginProfissionais = async function(req, res, next) {
  const {body: {professional}} = req;

  if(!professional.email) {
    return res.status(422).json({
      email: 'precisamos de um email',
    });
  }

  if(!professional.password) {
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
        const professional = passaportProfessional;
        professional.token = passaportProfessional.generateJWT();
        return res.status(200).json({result: professional.toAuthJSON()})
      }

      return  res.status(400).json({error: "Usuário não encontrado", professional});
    })(req, res, next);

}

exports.getProfissionais = async function(_, res, next) {

  Profissionais.find(function(error, result){
    if(error) {
      return res.status(400).json({error});
    } else {
      return res.status(200).json({result});
    }
  });
}

exports.createProfissionais = async function(req, res, next) {
  const {body: {professional}} = req;

  if(!professional) {
    return res.status(400).send({error: 'Não existe profissional para cadastrar'});
  }

  if(!professional.email) {
    return res.status(422).json({
      error: 'precisamos de um email',
    });
  }

  if(!professional.password) {
    return res.status(422).json({
      error: 'precisamos de uma senha',
    });
  }

  const finalProfessional = new Profissionais(professional);
  
  finalProfessional.setPassword(professional.password);

  finalProfessional.save(
    function(error, document){
      if(error) {
        res.status(300).json({error});
      } else {
        res.json({ result: finalProfessional.toAuthJSON()});
      }
    }
  );
}

exports.logoutProfissionais = async function(req, res, next) {
  const { payload } = req;

  blacklist.revoke(payload, function(error) {
    if(error) {
      return res.status(400).json({error});
    } else {
      return res.status(200).json({result: 'loged out'});
    }
  });
}

exports.getProfissionaisByParameter = async function(req, res, next) {
  let consulta = {};
  consulta[req.params.parametro] = new RegExp(req.params.valor,'i');

  Profissionais.find(
    consulta,
    function(error, result){
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
    });
}

exports.currentProfessionais = async function(req, res, next) {
  const { payload: { id } } = req;

  Profissionais.findById(
    id, 
    function(error, result) {
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
  });
}

exports.deleteProfessionais = async function(req, res, next) {
  Profissionais.findByIdAndRemove(
    req.params.id_profissional,
    function(error, result) {
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
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