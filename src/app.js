const express = require('express');//importação do pacote
const cors = require('cors');
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');

var Paciente = require('./models/pacientes/paciente');

const app = express();//instanciando express

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api-hospital', {
  useMongoClient: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/pacientes/:id_paciente', function(req, res) {

  Paciente.findById(req.params.id_paciente, function(erro, paciente) {
    if(erro) {
      res.status(404).send(erro);
    } else {
      res.status(200).send(paciente);
    }
  });
});

app.get('/api/pacientes', function(req, res) {
  Paciente.find(function(error, pacientes){
    if(error){
      res.status(404).send(error);
    } else {
      res.status(200).send(pacientes);
    }
  });
});

app.get('/api/pacientes/:parametro/:value', function(req, res) {
  let consulta = {};
  consulta[req.params.parametro] = new RegExp(req.params.value,'i');

  Paciente.find(consulta,
   function(erro, paciente){
      if(erro){
        res.status(404).send(erro);
      } else {
        res.status(200).send(paciente);
      }
  });
});

app.post('/api/pacientes', function(req, res){
 let paciente = new Paciente();

 paciente.nome = req.body.nome;
 paciente.sobrenome = req.body.sobrenome;
 paciente.numeroProtocolo = req.body.numeroProtocolo;

 paciente.save(function(erro){
   if(erro){
    res.status(404).send(erro);
   } else {
    res.status(200).send('enviou paciente');
   }
 });

});

app.put('/api/pacientes/:id_paciente', function(req, res){
  
  Paciente.findByIdAndUpdate(
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
});

app.patch('/api/pacientes/:id_paciente', function(req, res){

  Paciente.findByIdAndUpdate(
    req.params.id_paciente,
    req.body,
    function(erro, paciente) {
        if(erro){
          res.status(404).send(erro);
        } else {
          res.status(200).send(paciente);
        } 
      }
    );
});

app.delete('/api/pacientes/:id_paciente', function(req, res){

  Paciente.findByIdAndRemove(
    req.params.id_paciente,
    function(erro, resultado) {
      if(erro) {
        res.status(404).send(erro);
      } else {
        res.status(200).send(resultado);
      }
    }
  );
});

app.listen(3000);
