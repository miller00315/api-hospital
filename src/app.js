const express = require('express');//importação do pacote
const {execFile} = require('child_process');
const cors = require('cors');//importação do cors
const path = require('path');//inportação da path
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');//importação session
const  mongoose = require('mongoose');// importação mongoose
const bodyParser = require('body-parser');//importação do body parser
//const seeder = require('mongoose-seed');
const moment = require('moment-timezone');

require('./config');//importo o arquivo de configuração
require('./models/profissionais');
require('./models/pacientes');
require('./auth/passport');
/*
const sepse = require('./db/protocols/sepse');
const modules = require('./db/modules');
const stages = require('./db/stages');
const states = require('./db/states');
const cities = require('./db/cities');
const genres = require('./db/genres');

seeder.connect(global.gConfig.database, function() {
  seeder.loadModels(
    [
      './src/models/protocols', 
      './src/models/modules', 
      './src/models/stages',
      './src/models/cities',
      './src/models/states',
      './src/models/genres'
    ]
  );

  let data = [
    {
      model: 'protocol',
      documents: [
        sepse
      ]
    },
    {
      model: 'module',
      documents: modules
    },
    {
      model: 'stage',
      documents: stages
    },
    {
      model: 'city',
      documents: cities
    },
    {
      model: 'state',
      documents: states,
    },
    {
      model: 'genre',
      documents: genres,
    }
  ]
  
  seeder.clearModels([
    'protocol', 
    'module', 
    'stage', 
    'city', 
    'state', 
    'genre'], function(){
      seeder.populateModels(data, function() {
        seeder.disconnect();
    });
  });
  
});

*/

const app = express();//instanciando express

mongoose.Promise = global.Promise;

app.use(cors());//aplicando cors
app.use(helmet());//impedir ataques desconhecidos
app.use(bodyParser.urlencoded({ extended: false }));//aplicando bodyParser.urlencoded
app.use(bodyParser.json());//aplicando bodyParser.json
app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'hospital-api', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(require('./routes'));
app.disable('x-powered-by');

//console.log(JSON.stringify(sepse));

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

mongoose.Promise = require('bluebird');

execFile('c:/redis/redis-server.exe', function (error, stdout){
  if(error){
    console.log(error);
  } 
  console.log('saida', stdout);
});


app.get("*", (req, res) => {
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

app.use((erro, req, res, next) => {
  res.status(erro.status).send(erro);
});

app.listen(global.gConfig.node_port, () => {
  try {
    moment.locale('pt-br');
    moment.tz.setDefault('America/Bahia');
  } catch(e) {
    console.log(e);
  }
  console.log(`${global.gConfig.app_name} escutando na porta ${global.gConfig.node_port}`);
});//iniciando o listener
