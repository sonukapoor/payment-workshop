"use strict";
var Soap = require('soap');
var CybersourceGateway = (function () {
    function CybersourceGateway() {
        this.cybersourceUrl = "https://ics2wstest.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.93.wsdl";
        this.merchantID = "rangle_dev";
        this.transactionKey = "5kMTvJbzUdlgZTNcmfu0rqk1ZJ7ehUriTE55HUP1msawpoC48DYZjuwwTP7LP0E66fvt/saWwKDhoaiRwDbBUfl8klP3AowI+aO5rB3SjX+yoh/Y0Y8ZAxXoAIulXcd7QOzjeVXLjc1xKK+izRfkvOgKATtsYgRvzGtZHUNhUJiMXgcBExuQSqh9nw/HlFZHAA7fKgpe0Zm2jc2kieOPul08QLKEAUWxgIpiELAx8g3F5ui83t/5YeYumzw/cxZmzlehPQNIbvXc/r7FU7BUoep/MQkBSgjYBlx0E2Fe05moDC0SVKIL5D+XS/zn0bLsR2Ql3ZbmF2FbjqJkSuC0vQ==";
    }
    CybersourceGateway.prototype.getSecurity = function () {
        return new Soap.WSSecurity(this.merchantID, this.transactionKey);
    };
    CybersourceGateway.prototype.capture = function (data, callback) {
        console.log("CC", data);
        var merchant = this.merchantID;
        var ws = this.getSecurity();
        Soap.createClient(this.cybersourceUrl, function (err, client) {
            client.setSecurity(ws);
            var data = {
                merchantID: merchant,
                merchantReferenceCode: "TEST",
                clientLibrary: 'node.js',
                purchaseTotals: {
                    currency: "USD",
                    grandTotalAmount: 11.35
                },
                ccCaptureService: {
                    attributes: {
                        run: true,
                    },
                    authRequestID: "4756900151956784004012"
                }
            };
            client.runTransaction(data, function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                callback(null, result);
            });
        });
    };
    CybersourceGateway.prototype.authorize = function (cc, callback) {
        var merchant = this.merchantID;
        var ws = this.getSecurity();
        Soap.createClient(this.cybersourceUrl, function (err, client) {
            client.setSecurity(ws);
            var data = {
                merchantID: merchant,
                merchantReferenceCode: "TEST",
                clientLibrary: 'node.js',
                billTo: cc.billTo,
                item: {
                    attributes: {
                        id: 0
                    },
                    unitPrice: 10.35,
                    quantity: 2,
                    productCode: '2001',
                    productName: 'Blank T-Shirt',
                    productSKU: "20010102"
                },
                purchaseTotals: cc.purchaseTotals,
                card: cc.card,
                ccAuthService: {
                    attributes: {
                        run: true,
                    }
                }
            };
            client.runTransaction(data, function (err, result) {
                if (err)
                    callback(err, null);
                callback(null, result);
            });
        });
    };
    return CybersourceGateway;
}());
module.exports = CybersourceGateway;
//# sourceMappingURL=CybersourceGateway.js.map