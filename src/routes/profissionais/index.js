const express = require('express');
const router = express.Router();

const Profissionais = require('../../models/profissionais');

router.use(function timeLog(req, res, next) {
  console.log('Profissionais time: ', Date.now());
  next();
})

.get('/', function(_, res) {//recuperar todos os usuários
  Profissionais.find(function(error, profissionais){
    if(error){
      res.status(404).send(error);
    } else {
      res.status(200).send(profissionais);
    }
  });
});

module.exports = router;