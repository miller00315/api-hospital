const express = require('express');
const router = express.Router();

const Pacientes = require('../../../models/pacientes');

const {auth, checkBlackList} = require('../../../auth');

router.use(async (err, req, res, next) => {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
})

.get('/', auth.required, async function(req, res) {//recuperar todos os usuários
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      Pacientes.find(function(error, pacientes){
        if(error){
          res.status(404).send(error);
        } else {
          res.status(200).send(pacientes);
        }
      });
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.get('/:id_paciente', auth.required, async function(req, res) {//buscar usuário por id
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      Pacientes.findById(req.params.id_paciente, function(erro, paciente) {
        if(erro) {
          res.status(404).send(erro);
        } else {
          res.status(200).send(paciente);
        }
      });
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.get('/:parametro/:valor', auth.required, async function(req, res) {//buscar usuário por parametro
  
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      let consulta = {};
      consulta[req.params.parametro] = new RegExp(req.params.valor,'i');

      Pacientes.find(consulta,
      function(erro, paciente){
          if(erro){
            res.status(404).send(erro);
          } else {
            res.status(200).send(paciente);
          }
      });
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.post('/', auth.required, async function(req, res){//inserir novo dado

  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      let paciente = new Pacientes();
    
      paciente.nome = req.body.nome;
      paciente.sobrenome = req.body.sobrenome;
      paciente.numeroProtocolo = req.body.numeroProtocolo;
    
      paciente.save(function(erro){
        if(erro){
        res.status(404).send(erro);
        } else {
        res.status(200).send(paciente);
        }
      });
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.patch('/:id_paciente', auth.required, async function(req, res){//atualizar dados parciais
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      Pacientes.findByIdAndUpdate(
        req.params.id_paciente,
        req.body,
        {new: true},
        function(erro, paciente) {
            if(erro){
              res.status(404).send(erro);
            } else {
              res.status(200).send(paciente);
            } 
          }
        );
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.put('/:id_paciente', auth.required, async function(req, res){//altero todo os dados

  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      Pacientes.replaceOne(
        {"_id": req.params.id_paciente},
        req.body,
        function(erro, paciente) {
            if(erro){
              res.status(404).send(erro);
            } else {
              res.status(200).send(paciente);
            } 
          }
      );
    }
  }).catch(erro => res.status(erro.code).send(erro));
})

.delete('/:id_paciente', auth.required, async function(req, res) {//excluo um item específico
  checkBlackList(req, res).then(authorization => {
    if(authorization) {
      Pacientes.findByIdAndRemove(
        req.params.id_paciente,
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