const express = require('express');//importação do pacote
const cors = require('cors');//importação do cors
const path = require('path');
const session = require('express-session');
const  mongoose = require('mongoose');// importação mongoose
const bodyParser = require('body-parser');//importação do body parser

require('./config');//importo o arquivo de configuração
require('./models/profissionais');
require('./models/pacientes');
require('./config/passport');

const app = express();//instanciando express

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());//aplicando cors
app.use(bodyParser.urlencoded({ extended: false }));//aplicando bodyParser.urlencoded
app.use(bodyParser.json());//aplicando bodyParser.json
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'hospital-api', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(require('./routes'));

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

mongoose.set('debug', true);

if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.use((erro, req, res, next) => {
  res.status(erro.status).send(erro);
});

app.listen(global.gConfig.node_port, () => {
  console.log(`${global.gConfig.app_name} escutando na porta ${global.gConfig.node_port}`);
});//iniciando o listener
