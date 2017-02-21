import IPaymentGateway = require('../interfaces/IPaymentGateway');
import Soap = require('soap');

class CybersourceGateway implements IPaymentGateway {
	cybersourceUrl: string;
	merchantID: string;
	transactionKey: string;

	public constructor() {
		this.cybersourceUrl = "https://ics2wstest.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.93.wsdl";
		this.merchantID = "sonukapoor";
		this.transactionKey = "8CbkVGnSIKWouQq9q/tO2lKkMX3EibWaAH7wJOgSJkuKH3NjRq4JAovg7hS7kE3V7E+x7G/wJRdtotOvZogLEZt7VyIPsphxz+TnoHEyJD/gV/y798iBSsgGFnj2ByfKShWX1Vbjx0PHPmMx/Nm7Dqw9K6InxSLWU+btgl3GEX9cMYsamtgwq8JVxM0D/iWsuTBeQpXJW2H36nwenQq++KEvGskYRXysqUHN/0cxXfLOoHJx53c902Vhu1NRszfRKfNWHyllbpJdGlmSTSKlWEoLkrJleiWrG5Ha8+xpagRsDItas3Lf82BzeohZucsmfY1EdjFCV4m5R2BI4Roo5g==";
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