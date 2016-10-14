import IPaymentGateway = require('../interfaces/IPaymentGateway');
import Soap = require('soap');

class CybersourceGateway implements IPaymentGateway {
	cybersourceUrl: string;
	merchantID: string;
	transactionKey: string;

	public constructor() {
		this.cybersourceUrl = "https://ics2wstest.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.93.wsdl";
		this.merchantID = "rangle_dev";
		this.transactionKey = "5kMTvJbzUdlgZTNcmfu0rqk1ZJ7ehUriTE55HUP1msawpoC48DYZjuwwTP7LP0E66fvt/saWwKDhoaiRwDbBUfl8klP3AowI+aO5rB3SjX+yoh/Y0Y8ZAxXoAIulXcd7QOzjeVXLjc1xKK+izRfkvOgKATtsYgRvzGtZHUNhUJiMXgcBExuQSqh9nw/HlFZHAA7fKgpe0Zm2jc2kieOPul08QLKEAUWxgIpiELAx8g3F5ui83t/5YeYumzw/cxZmzlehPQNIbvXc/r7FU7BUoep/MQkBSgjYBlx0E2Fe05moDC0SVKIL5D+XS/zn0bLsR2Ql3ZbmF2FbjqJkSuC0vQ==";
	}

	private getSecurity() {
		return new Soap.WSSecurity(this.merchantID, this.transactionKey);
	}

	capture(subscription: any, callback) {
		var merchant = this.merchantID;
		var ws = this.getSecurity();

		Soap.createClient(this.cybersourceUrl, function (err, client) {
			client.setSecurity(ws);

			var data = {
				merchantID: merchant,
				merchantReferenceCode: subscription.merchantReferenceCode,
				clientLibrary: 'node.js',
				purchaseTotals: {
					currency: subscription.currency,
					grandTotalAmount: subscription.grandTotalAmount,
				},
				ccCaptureService: {
					attributes: {
						run: true,
					},
					authRequestID: subscription.requestID,
				}
			}

			client.runTransaction(data, function (err, result) {
				if (err)
					callback(err, null);

				callback(null, result);
			});
		});
	}

	authorize(cc: any, callback) {
		var merchant = this.merchantID;
		var ws = this.getSecurity();

		Soap.createClient(this.cybersourceUrl, function (err, client) {
			client.setSecurity(ws);

			var data = {
				merchantID: merchant,
				merchantReferenceCode: cc.merchantReferenceCode,
				clientLibrary: 'node.js',
				billTo: {
					firstName: cc.billTo.firstName,
					lastName: cc.billTo.lastName,
					street1: cc.billTo.street1,
					city: cc.billTo.city,
					state: cc.billTo.state,
					postalCode: cc.billTo.postalCode,
					country: cc.billTo.country,
					email: cc.billTo.email,
				},
				item: {
					attributes: {
						id: 0
					},
					unitPrice: cc.item.unitPrice,
					quantity: cc.item.quantity,
					productCode: cc.item.productCode,
					productName: cc.item.productName,
					productSKU: cc.item.productSKU,
				},
				purchaseTotals: {
					currency: cc.purchaseTotals.currency,
					grandTotalAmount: cc.purchaseTotals.grandTotalAmount,
				},
				card: {
					accountNumber: cc.card.accountNumber,
					expirationMonth: cc.card.expirationMonth,
					expirationYear: cc.card.expirationYear,
					cvNumber: cc.card.cvNumber,
					cardType: cc.card.cardType,
				},
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
	}
}

export = CybersourceGateway;