const ProtocolExecution = require('../../models/protocolExecution');
const _ = require('lodash');
const moment = require('moment-timezone');

exports.create = async function(req, res) {

  const {body: {protocolExecution}} = req;

  if(!protocolExecution) {
    return res.status(422).json({error: "Sem protocolo para registrar"});
  }

  if(!protocolExecution.patientId) {
    return res.status(422).json({error: "Sem identificação de paciente"});
  }

  if(!protocolExecution.protocolCode) {
    return res.status(422).json({error: "Sem código de protocolo"});
  }

  if(!protocolExecution.createdBy) {
    return res.status(422).json({error: "Sem usuário de protocolo"});
  }

  const newProtocolExecution = new ProtocolExecution(protocolExecution);

  newProtocolExecution.initialSetup();

  return newProtocolExecution.save(function(error, result) {
    if(error) {
      res.status(300).json({error});
    } else {
      res.status(200).json({result});
    }
  });
}

exports.getByPatientId = async function(req, res) {
  const {patientId} = req.query;

  if(!patientId)
    return res.status(422).json({error: "Sem paciente de referência"});

  let query = {};

  query['patientId'] = new RegExp(patientId, 'i');

  ProtocolExecution.find(
    query, 
    function(error, result) {
      if(error) {
        return res.status(404).json({error});
      } else {
        return res.status(200).json({result});
      }
    });
}

exports.getByProtocolCode = async function(req, res) {
  const {protocolCode} = req.query;

  if(!protocolCode)
    return res.status(422).json({error: "Sem protocolo de referência"});

  let query = {};

  query['protocolCode'] = new RegExp(protocolCode, 'i');

  ProtocolExecution.find(
    query, 
    function(error, result) {
      if(error) {
        return res.status(404).json({error});
      } else {
        return res.status(200).json({result});
      }
    });
}

exports.getByPatientId_ProtocolCode = async function(req, res) {
  const {protocolCode, patientId} = req.query;

  if(!protocolCode)
    return res.status(422).json({error: "Sem protocolo de referência"});

  if(!patientId)
    return res.status(422).json({error: "Sem paciente de referência"});

  let query = {};

  query['patientId'] = new RegExp(patientId, 'i');
  query['protocolCode'] = new RegExp(protocolCode, 'i');

  ProtocolExecution.find(
    query, 
    function(error, result) {
      if(error) {
        return res.status(404).json({error});
      } else {
        return res.status(200).json({result});
      }
    });
}

exports.update = async function(req, res) {

  const {protocolId, user} = req.query;
  const {body: {module}} = req;

  if(!protocolId)
    return res.status(422).json({error: "Sem protocolo de referência"});
  
  if(!module)
    return res.status(422).json({error: "Sem modulo de referência"});

  if(!user)
    return res.status(422).json({error: "Sem usuário de referência"});

    ProtocolExecution.findById(
    protocolId, 
    function(error, document) {
      if(error) {
        return res.status(404).json({error});
      } else {
        let updatedProtocol = new ProtocolExecution(document);
        updatedProtocol.update(module, user);

        ProtocolExecution.findByIdAndUpdate(
          updatedProtocol._id,
          updatedProtocol,
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
    });
}

exports.delete = async function(req, res) {
  
  const {protocolId} = req.query;
  
  ProtocolExecution.findByIdAndDelete(
    protocolId,
    function (error, result) {
      if(error) {
        return res.status(400).json({error});
      } else {
        return res.status(200).json({result});
      }
    }
  )
}

exports.finish = async function(req, res) {
  const {protocolId, user} = req.query;

  if(!protocolId)
    return res.status(422).json({error: "Sem protocolo de referência"});

  if(!user)
    return res.status(422).json({error: "Sem usuário de referência"});

  ProtocolExecution.findByIdAndUpdate(
    protocolId,
    {isExecuting: false, finishedAt: moment().toDate(), finishedBy: user},
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

exports.restart = async function(req, res) {
  const {protocolId, user} = req.query;

  if(!protocolId)
    return res.status(422).json({error: "Sem protocolo de referência"});

  if(!user)
    return res.status(422).json({error: "Sem usuário de referência"});

  ProtocolExecution.findByIdAndUpdate(
    protocolId,
    {isExecuting: false, restartedAt: moment().toDate(), restartedBy: user},
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