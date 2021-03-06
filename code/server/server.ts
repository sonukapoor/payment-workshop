/// <reference path="typings/index.d.ts" />

import express = require('express');
import bodyParser = require("body-parser");
import path = require('path');
import paymentGateway = require('./business/CybersourceGateway');
var cors = require('cors');

var port: number = process.env.PORT || 8000;
var env: string = process.env.NODE_ENV || 'development';

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', port);
app.use('/app', express.static(path.resolve(__dirname, '../client/src/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

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
/*
app.options('*', function (req, res, next) {
    res.send(200);
});
*/
app.post('/api/capture', function (req, res) {
    console.log("body", req.body); 
    var p = new paymentGateway();
    p.capture(req.body, (err, result) => {
        console.log(err, result)
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

app.post('/api/authorize', function (req, res) {
    var p = new paymentGateway();
    p.authorize(req.body, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

if (env === 'development') {
    app.use(function (err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});


app.listen(8000);
console.log('Server is running on 8000');