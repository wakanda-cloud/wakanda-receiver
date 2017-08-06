'use strict';

let redis = require('redis');
let redisClient = null;

if (process.env.REDIS_URL) {
    redisClient = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
} else if (process.env.REDIS_STATISTIC_RECEIVER_NAME) {
    let port = process.env.REDIS_STATISTIC_RECEIVER_PORT_6379_TCP_PORT;
    let address = process.env.REDIS_STATISTIC_RECEIVER_PORT_6379_TCP_ADDR;
    redisClient = redis.createClient(port, address);
}

redisClient.on('connect', function() {
    let label_environment = process.env.REDIS_STATISTIC_RECEIVER_PORT_6379_TCP_ADDR ? 'docker production' : 'developer';
    let environment = process.env.REDIS_URL ? 'heroku production' : label_environment;
    console.log('Redis %s environment connected', environment);
});

module.exports = redisClient;
