'use strict';

var request = require('request');
var redisClient = require('./RedisConnector');
var crypto = require('crypto');

class ApiKeyManager {
}

ApiKeyManager.storeApiKey = function(wakandaInstanceData) {
    let hash = crypto.createHash('md5').update(JSON.stringify(wakandaInstanceData.name)).digest('hex');
    redisClient.set(hash, JSON.stringify(wakandaInstanceData));
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