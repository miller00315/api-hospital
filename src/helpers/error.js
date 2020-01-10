class ErroHandler extends Error{
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handlerError = function(erro, res){
  const {statusCode, message} = erro;
  res.status(statusCode).json({
    status: 'erro',
    statusCode,
    message,
  });
}

module.exports = {ErroHandler, handlerError};