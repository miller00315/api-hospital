const Modules = require('../../models/modules');
const _ = require('lodash');

exports.getModules = async function(_, res) {
  Modules.find(function(error, result) {
    if(error) {
      return res.status(400).json({error});
    } else {
      return res.status(200).json({result});
    }
  });
}

exports.getModulesByProtocol = async function(req, res, next) {
  const {stages} = req.body;

  if(!stages) {
    return res.status(404).json({error: 'Sem etapas'});
  }

  const items = _.map(stages);

  let jobQueries = [];

  items.forEach(function(value, index) {
    let query = {};
    query['code'] = new RegExp(value.module, 'i');
    jobQueries.push(Modules.find(query));
  });

  Promise.all(jobQueries)
    .then(function(result) {
      res.status(200).json(_.flattenDeep(result));
    })
    .catch(function(error) {
      res.status(404).json(error);
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