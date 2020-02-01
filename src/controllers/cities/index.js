const Cities = require('../../models/cities');

exports.getCitiesByState = async function(req, res) {
  const {stateCode} = req.params;

  let query = {};

  query['stateCode'] = new RegExp(stateCode, 'i');

  Cities.find(query, function(error, result) {
    if(error) {
      return res.state(404).json({error});
    } else {
      return res.state(200).json({result});
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