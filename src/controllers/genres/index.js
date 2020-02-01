const Genres = require('../../models/genres');

exports.getGenres = async function(_, res) {
  Genres.find(
    function(error, result) {
      if(error) {
        return res.status(404).json({error});
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