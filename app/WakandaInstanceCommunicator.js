'use strict';

let request = require('request');

class WakandaInstanceCommunicator {
}

WakandaInstanceCommunicator.deleteAllData = function (url) {
    let options = {
        uri: url + "/deleteStatistics",
        method: 'POST'
    };
    request(options);
};

WakandaInstanceCommunicator.send = function (url, data) {
    let options = {
        uri: url + "/registerStatistic",
        method: 'POST',
        json: data
    };

    request(options);
};

module.exports = WakandaInstanceCommunicator;