const express = require('express');//importação do pacote
const cors = require('cors');//importação do cors
const  mongoose = require('mongoose');// importação mongoose
const bodyParser = require('body-parser');//importação do body parser

process.env.NODE_ENV = 'development';

const Pacientes = require('./routes/pacientes');//instanciando a rota pacientes
const Profissionais = require('./routes/profissionais');
const config = require('./config');

const app = express();//instanciando express

mongoose.Promise = global.Promise;

mongoose.connect(global.gConfig.database, 
  {useMongoClient: true}, 
  function(erro) {
    if(erro) {
      console.log('Erro ao conectar ao banco de dados', erro);
      mongoose.connection.close();
    } else {
      console.log('Conectado com o banco de dados', global.gConfig.database);
    }
});

app.use(cors());//aplicando cors
app.use(bodyParser.urlencoded({ extended: false }));//aplicando bodyParser.urlencoded
app.use(bodyParser.json());//aplicando bodyParser.json
app.use('/pacientes', Pacientes);//aplicando o model Pacientes
app.use('/profissionais', Profissionais);//aplicando o model Profissionais

app.listen(global.gConfig.node_port, () => {
  console.log(`${global.gConfig.app_name} escutando na porta ${global.gConfig.node_port}`);
});//iniciando o listener
