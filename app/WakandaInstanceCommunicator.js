'use strict';

let request = require('request');
let CryptoJS = require('crypto-js');

class WakandaInstanceCommunicator {
}

WakandaInstanceCommunicator.deleteAllData = function (url, encryptKey) {
    var data = JSON.stringify({
        key : encryptKey
    });

    let options = {
        uri: url + "/deleteStatistics",
        method: 'POST',
        json: {
            data: CryptoJS.AES.encrypt(data, encryptKey, {
                mode: CryptoJS.mode.CTR
            }).toString()
        }
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