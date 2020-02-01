const States = require('../../models/states');

exports.getStates = async function(_, res) {
  States.find(function(error, result) {
    if(error) {
      return res.status(400).json({error});
    } else {
      return res.status(200).json({result});
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