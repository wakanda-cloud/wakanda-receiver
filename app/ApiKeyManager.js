'use strict';

var request = require('request');
var redisClient = require('./RedisConnector');

class ApiKeyManager {
}

ApiKeyManager.deleteApiKey = function(apiKey) {
    console.log("Deleting api key: " + apiKey);
    redisClient.del(apiKey);
};

ApiKeyManager.storeApiKey = function(wakandaInstanceData) {
    redisClient.set(wakandaInstanceData.apiKey, JSON.stringify(wakandaInstanceData));
};

ApiKeyManager.findProject = function(apiKey, callback) {
    console.log('Trying to find by apiKey: ' + apiKey);
    redisClient.get(apiKey, function(error, data) {
       if(data) {
            callback.call(this, JSON.parse(data));
       } else {
            callback.call(this, null);
       }
    });
};

module.exports = ApiKeyManager;