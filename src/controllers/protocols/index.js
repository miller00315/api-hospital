const Protocols = require('../../models/protocols');

exports.getProtocols = async function(_, res) {
  Protocols.find(function(error, protocols) {
    if(error) {
      res.status(404).send(error);
    } else {
      res.status(200).send(protocols);
    }
  });
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