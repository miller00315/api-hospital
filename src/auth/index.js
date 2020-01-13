const jwt = require('express-jwt');
const blackList = require('express-jwt-blacklist');

blackList.configure({
  tokenId: 'jti',
  strict: false,
  store: {
    type: 'redis',
    host: '127.0.0.1',
    port: 6379,
    keyPrefix: 'authentication:',
    options: {
      timeout: 1000
    }
  }
});

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
    isRevoked: blackList.isRevoked,
  }),
  optional: jwt({
    secret: global.gConfig.jwt_key,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;