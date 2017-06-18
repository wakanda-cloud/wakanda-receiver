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
    //var url = 'https://wakanda-instance-generator.herokuapp.com';
    var url = 'http://localhost:5000';
    var options = {
        url: url + "/projects",
        crossDomain: true,
        async:"false",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        },
        data: {
            apiKey: apiKey
        }
    };
    request(options, function(error, response, body) {
        if(response.statusCode === 200) {
            callback.apply(this, body, response.statusCode);
        }
    });
};

module.exports = ApiKeyManager;