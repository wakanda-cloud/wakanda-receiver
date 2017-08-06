'use strict';

let redis = require('redis');
let redisClient = null;

if (process.env.REDIS_URL) {
    redisClient = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
} else {
    redisClient = redis.createClient();
}

redisClient.on('connect', function() {
    let label_environment = process.env.REDIS_STATISTIC_RECEIVER_PORT_6379_TCP_ADDR ? 'docker production' : 'developer';
    let environment = process.env.REDIS_URL ? 'heroku production' : label_environment;
    console.log('Redis %s environment connected', environment);
});

module.exports = redisClient;
