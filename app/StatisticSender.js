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
        "url": url,
        "method": "POST",
        "data": data
    };

    request(settings, function (error, response, body) {
        if (response.statusCode === 200) {
            callback.apply(this, response);
        }
    });
};

module.exports = StatisticSender;