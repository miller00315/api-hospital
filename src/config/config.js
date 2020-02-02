require('dotenv').config({path: __dirname+'./.env'});

const config = {
  "development": {
    "config_id": "development",
    "app_name": "Api-hospital",
    "app_desc": "Api para o aplicativo do hospital",
    "node_port": 3001,
    "database": "mongodb://localhost:27017/api-hospital",
    "jwt_key": "api-hospital",
    "redis_port": 6379
  },
  "testing": {
    "config_id": "testing",
    "database": "mongodb://localhost:27017/api-hospital",
    "jwt_key": "api-hospital"
  },
  "staging": {
    "config_id": "staging",
    "node_port": 8080,
    "database": "mongodb://localhost:27017/api-hospital",
    "jwt_key": "api-hospital"
  },
  "production": {
    "config_id": "development",
    "app_name": "Api-hospital",
    "app_desc": "Api para o aplicativo do hospital",
    "node_port": 3001,
    "database": "mongodb://localhost:27017/api-hospital",
    "jwt_key": "api-hospital",
    "redis_port": 6379
  }
}

module.exports = config;
