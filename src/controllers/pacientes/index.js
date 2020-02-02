const Pacientes = require('../../models/pacientes');

exports.getPacientes = async function(_, res) {//recuperar todos os usuários
  
  Pacientes.find(function(error, result){
    if(error) {
      return res.status(400).json({error});
    } else {
      return res.status(200).json({result});
    }
  });
}

exports.getPacienteById = async function(req, res) {//buscar usuário por id
  
  Pacientes.findById(
    req.params.id_paciente, 
    function(error, result) {
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
  });
}

exports.getPacientesByParameter = async function(req, res) {//buscar usuário por parametro
 
  let consulta = {};
  consulta[req.params.parametro] = new RegExp(req.params.valor,'i');

  Pacientes.find(
    consulta,
    function(error, result){
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
    });
}

exports.createPacientes = async function(req, res){//inserir novo dado

  const {body: {patient}} = req;

  if(!patient) 
    return res.status(422).json({error: 'Sem paciente de referência'});
  
  let newPatient = new Pacientes(patient);

  newPatient.register_date = new Date();

  newPatient.save(
    function(error, result){
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
    });
}

exports.updatePacienteData = async function(req, res){//atualizar dados parciais
  
  Pacientes.findByIdAndUpdate(
    req.params.id_paciente,
    req.body,
    {new: true},
    function(error, result) {
        if(error) {
          return res.status(400).json({error});
        } else {
          return res.status(200).json({result});
        }
      }
    );
}

exports.updatePaciente = async function(req, res){//altero todo os dados

  Pacientes.replaceOne(
    {"_id": req.params.id_paciente},
    req.body,
    function(error, result) {
        if(error) {
          return res.status(400).json({error});
        } else {
          return res.status(200).json({result});
        } 
      }
  );
} 

exports.deletePacientes = async function(req, res) {//excluo um item específico
  
  Pacientes.findByIdAndRemove(
    req.params.id_paciente,
    function(error, result) {
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
    }
  );
}

exports.invalidRoute = async function(_, res, next){
  res.status(404).json({message: 'Rota inexistente'});
}

exports.routerError = async function(err, _, res, next) {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
}