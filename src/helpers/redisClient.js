const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('connect',()=>{
  console.log('Redis client connected')
});

redisClient.on('error', (error)=>{
  console.log('Redis not connected', error)
});

module.exports = redisClient;