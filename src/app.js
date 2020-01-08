const express = require('express');//importação do pacote
const cors = require('cors');//importação do cors
const  mongoose = require('mongoose');// importação mongoose
const bodyParser = require('body-parser');//importação do body parser

const Pacientes = require('./routes/pacientes');//instanciando a rota pacientes
const Profissionais = require('./routes/profissionais');

const app = express();//instanciando express

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api-hospital', {//conexão com banco de dados
  useMongoClient: true
});

app.use(cors());//aplicando cors
app.use(bodyParser.urlencoded({ extended: false }));//aplicando bodyParser.urlencoded
app.use(bodyParser.json());//aplicando bodyParser.json
app.use('/pacientes', Pacientes);//aplicando o model Pacientes
app.use('/profissionais', Profissionais);//aplicando o mode Profissionais

app.listen(3000);//iniciando o listener
