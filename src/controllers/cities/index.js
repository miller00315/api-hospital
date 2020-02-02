const Cities = require('../../models/cities');

exports.getCitiesByState = async function(req, res) {
  const {stateCode} = req.query;

  let query = {};

  if(stateCode === '')
    return res.status(404).json({error: 'Sem estado de parametro'});

  query['stateCode'] = new RegExp(`${stateCode}`, 'i');

  Cities.find(
    query, 
    function(error, result) {
      if(error) {
        return res.status(404).json({error});
      } else {
        console.log(result);
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