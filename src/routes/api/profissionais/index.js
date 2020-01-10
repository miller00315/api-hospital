const express = require('express');
const router = express.Router();
const passaport = require('passport');

const Profissionais = require('../../../models/profissionais');
const auth = require('../../../auth');

router.use(async (err, req, res, next) => {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
})

.get('/', auth.required, async function(_, res, next) {//recuperar todos os usuários
  try{
    Profissionais.find(function(error, profissionais){
      if(error){
        res.status(404).send(error);
      } else {
        res.status(200).send(profissionais);
      }
    });
  } catch(erro){
    next(erro);
  }
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

.get('/current', auth.required, function(req, res, next){

  const { payload: { id } } = req;

  Profissionais.findById(id, function(erro, profissional) {
    if(erro){
      res.status(401).send(erro);
    } else {
      res.status(200).send(profissional);
    }
  });
  
});


module.exports = router;