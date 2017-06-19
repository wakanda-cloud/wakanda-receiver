'use strict';

let routes = function(){};
let securityService = require('./app/SecurityService');
let ApiKeyManager = require('./app/ApiKeyManager');
let StatisticSender = require('./app/StatisticSender');

routes.deleteApiKey = function (req, res) {
    let apiKey = req.body.apiKey;

    ApiKeyManager.deleteApiKey(apiKey);
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

routes.registerStatistic = function(req, res) {
    let apiKey = req.body.apiKey;
    let statisticData = req.body.data;

    ApiKeyManager.findProject(apiKey, function(project) {
        if((!(project instanceof Object)) || !project.url) {
            res.status(400).send("Problems found on your api key");
            return;
        }

        sendStatistic(project, statisticData);
        res.status(200).send();
    });

};

let sendStatistic = function(project, data, responseCallback) {
    StatisticSender.send(project.url, data, responseCallback);
};

module.exports = routes;