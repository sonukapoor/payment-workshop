/// <reference path="typings/index.d.ts" />
"use strict";
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var paymentGateway = require('./business/CybersourceGateway');
var port = process.env.PORT || 8000;
var env = process.env.NODE_ENV || 'development';
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('port', port);
app.use('/app', express.static(path.resolve(__dirname, '../client/src/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});
// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));
app.use(bodyParser.json());
/*
var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/src/index.html'));
}
app.get('/*', renderIndex);
*/
app.post('/api/capture', function (req, res) {
    console.log("body", req.body);
    var p = new paymentGateway();
    p.capture(req.body, function (err, result) {
        console.log(err, result);
        if (err)
            res.send(err);
        res.send(result);
    });
});
app.post('/api/authorize', function (req, res) {
    console.log("body", JSON.parse(req.body));
    var p = new paymentGateway();
    p.authorize(req.body, function (err, result) {
        console.log(err, result);
        if (err)
            res.send(err);
        res.send(result);
    });
});
if (env === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
app.listen(8000);
console.log('Server is running on 8000');
//# sourceMappingURL=server.js.map