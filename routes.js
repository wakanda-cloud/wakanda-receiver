'use strict';

let routes = function(){};
let securityService = require('./app/SecurityService');
let ApiKeyManager = require('./app/ApiKeyManager');
let StatisticSender = require('./app/StatisticSender');

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

    ApiKeyManager.findProject(apiKey, function(project, status) {
        if(status !== 200) {
            res.status(status).send("Problems found on your api key");
            return;
        }

        sendStatistic(project, statisticData, function(status) {
            status === 200 ? res.status(200).send() : res.status(404).send();
        });
    });

};

let sendStatistic = function(project, data, responseCallback) {
    StatisticSender.send(project.url, data, responseCallback);
};

module.exports = routes;