'use strict';

let request = require('request');

class StatisticSender {
}

StatisticSender.send = function (url, data) {
    let options = {
        uri: url + "/registerStatistic",
        method: 'POST',
        json: data
    };

    request(options);
};

module.exports = StatisticSender;