const express = require('express');
const router = express.Router();

const Pacientes = require('../../../models/pacientes');

const auth = require('../../../auth');

router.use(async (err, req, res, next) => {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
})

.get('/', auth.required, async function(req, res) {//recuperar todos os usuários
  
      Pacientes.find(function(error, pacientes){
        if(error){
          res.status(404).send(error);
        } else {
          res.status(200).send(pacientes);
        }
      });
})

.get('/:id_paciente', auth.required, async function(req, res) {//buscar usuário por id
  
      Pacientes.findById(req.params.id_paciente, function(erro, paciente) {
        if(erro) {
          res.status(404).send(erro);
        } else {
          res.status(200).send(paciente);
        }
      });
})

.get('/:parametro/:valor', auth.required, async function(req, res) {//buscar usuário por parametro
 
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
})

.post('/', auth.required, async function(req, res){//inserir novo dado

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
})

.patch('/:id_paciente', auth.required, async function(req, res){//atualizar dados parciais
  
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
})

.put('/:id_paciente', auth.required, async function(req, res){//altero todo os dados

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
})

.delete('/:id_paciente', auth.required, async function(req, res) {//excluo um item específico
  
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