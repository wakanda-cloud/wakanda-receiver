var express = require('express');
var app = express();

var bodyparser = require('body-parser');

app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), function () {

    if(!process.env.DECRYPT_KEY) {
        process.env.DECRYPT_KEY = "1234578";
        throw "Decrypt Key not configured";
    }

    var host = process.env.host;
    var port = app.get('port');
    console.log("Listening at http://%s:%s", host, port)
});

process.on('uncaughtException', function (error) {
    console.log("uncaughtException :" + error);
});
var cors = require('cors');

var routes = require('./routes');
app.use(cors());

app.use(bodyparser.json());
app.post('/statistics', routes.registerStatistic);
app.post('/apikey', routes.registerApiKey);
app.del('/apikey', routes.deleteApiKey);
