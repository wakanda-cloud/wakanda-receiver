'use strict';

let request = require('request');

class StatisticSender {
}

StatisticSender.send = function (url, data, callback) {
    let settings = {
        "crossDomain": true,
        "headers": {
            "content-type": "text/plain"
        },
        "url": url + "/registerStatistic",
        "method": "POST",
        "data": data
    };

    request(settings);
};

module.exports = StatisticSender;