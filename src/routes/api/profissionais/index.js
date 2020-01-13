const express = require('express');
const router = express.Router();
const passaport = require('passport');
//const blacklist = require('express-jwt-blacklist');
const redisClient = require('../../../config/redisClient');

const Profissionais = require('../../../models/profissionais');
const {auth, checkBlackList} = require('../../../auth');

router.use(async (err, req, res, next) => {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
})

.get('/', auth.required, async function(req, res, next) {//recuperar todos os usuários
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      Profissionais.find(function(error, profissionais){
        if(error){
          res.status(404).send(error);
        } else {
          res.status(200).send(profissionais);
        }
      });
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.post('/', auth.optional, function(req, res, next){
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
  
})

.post('/login', auth.optional, function(req, res, next){

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

})

.post('/logout', auth.required, async function(req, res, next){
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      try{
        redisClient.lpush('authorization', authorization);
        res.status(200).json({
          'status': 200,
          'data': 'You are logged out',
        });
      } catch(error) {
        res.status(500).json({status: 500, error: error});
      }
    }
  }).catch(erro => res.status(erro.code).send(erro)); 
})

.get('/current', auth.required, function(req, res, next){
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      const { payload: { id } } = req;

      Profissionais.findById(id, function(erro, profissional) {
        if(erro){
          res.status(401).send(erro);
        } else {
          res.status(200).send(profissional);
        }
      });
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.delete('/:id_profissional', auth.required, async function(req, res) {//excluo um item específico
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
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
  }).catch(erro => res.status(erro.code).send(erro));
})

.get("*", (req, res) => {
  res.status(404).json({message: 'Rota inexistente'});
})

.put("*", (req, res) => {
  res.status(404).json({message: 'Rota inexistente'});
})

.post("*", (req, res) => {
  res.status(404).json({message: 'Rota inexistente'});
})

.patch("*", (req, res) => {
  res.status(404).json({message: 'Rota inexistente'});
});


module.exports = router;