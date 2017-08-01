'use strict';

let routes = function(){};
let securityService = require('./app/SecurityService');
let ApiKeyManager = require('./app/ApiKeyManager');
let WakandaInstanceCommunicator = require('./app/WakandaInstanceCommunicator');
let WakandaAuthenticator = require('./app/WakandaAuthenticator');

routes.deleteApiKey = function (req, res) {
    let apiKey = req.query.apiKey;

    ApiKeyManager.deleteApiKey(apiKey);
    res.status(200).send();
};

routes.registerApiKey = function(req, res) {
    let data = req.body.wakandaInstanceData;

    try {
        ApiKeyManager.storeApiKey(securityService.decryptJSON(data));
        res.status(200).send();
    } catch(err) {
        res.status(500).send(err);
    }
};

routes.deleteStatistics = function (req, res) {
    let apiKey = req.body.apiKey;

    let error = function(data, status) {
        res.status(status).send("Error on deleteStatistics for " + apiKey + " to " + req.body.email);
    };

    new WakandaAuthenticator().authenticate(req.body.email, req.body.token, function() {
        routes.doForProjectWithApiKey(apiKey, res, function(project) {
            WakandaInstanceCommunicator.deleteAllData(project.url, project.decryptKey);
        });
    }, error);

};

routes.doForProjectWithApiKey = function (apiKey, res, callback) {
    ApiKeyManager.findProject(apiKey, function (project) {
        if ((!(project instanceof Object)) || !project.url) {
            res.status(400).send("Problems found on your api key");
        } else {
            callback.call(this, project);
            res.status(200).send();
        }
    });
};
routes.registerStatistic = function(req, res) {
    let apiKey = req.body.apiKey;

    routes.doForProjectWithApiKey(apiKey, res, function(project) {
        WakandaInstanceCommunicator.send(project.url, req.body);
    });
};

module.exports = routes;
