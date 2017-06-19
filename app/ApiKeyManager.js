'use strict';

var request = require('request');
var redisClient = require('./RedisConnector');

class ApiKeyManager {
}

ApiKeyManager.deleteApiKey = function(apiKey) {
    redisClient.del(apiKey);
};

ApiKeyManager.storeApiKey = function(wakandaInstanceData) {
    redisClient.set(wakandaInstanceData.apiKey, JSON.stringify(wakandaInstanceData));
};


ApiKeyManager.findProject = function(apiKey, callback) {
    redisClient.get(apiKey, function(error, data) {
       if(data) {
          callback.call(this, JSON.parse(data));
       } else {
           callback.call(this, null);
       }
    });
};

module.exports = ApiKeyManager;