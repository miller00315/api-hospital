const jwt = require('express-jwt');
const redisClient = require('../config/redisClient');

async function checkBlackList(req, res) {
  
  const { headers: { authorization } } = req;

  const result = new Promise((resolve, reject) => {
    redisClient.lrange('authorization', 0, -1, 
    function(erro, result){
      if(erro) {
        reject({code: 500, error: erro});
      } else {
        if(result.indexOf(authorization) > -1) {
          reject({code: 401, error: 'Este token está na black list'});
        } else {
          resolve(authorization);
        }
      }
    });
  })
  
  return result;
}

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  } else if(authorization) {
    return authorization;
  } else {
    return null;
  }
};

const auth = {
  required: jwt({
    secret: global.gConfig.jwt_key,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: global.gConfig.jwt_key,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = {auth, checkBlackList};