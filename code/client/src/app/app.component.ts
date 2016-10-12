import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { PaymentService } from './payment.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Credit Card Tester';
  apiResponse: any = null;

  numberMask = createNumberMask({
    prefix: '',
    suffix: '  $'
  })

  paymentForm: FormGroup;

  // Bill To Fields
  billTo: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  street1: FormControl;
  city: FormControl;
  state: FormControl;
  postalCode: FormControl;
  country: FormControl;
  email: FormControl;

  // Credit Card Fields
  card: FormGroup;
  accountNumber: FormControl;
  expirationMonth: FormControl;
  cvNumber: FormControl;

  // Item Card Fields
  item: FormGroup;
  productCode: FormControl;
  productName: FormControl;
  productSKU: FormControl;
  quantity: FormControl;
  unitPrice: FormControl;

  // Purchase Totals Fields
  purchaseTotals: FormGroup;
  currency: FormControl;
  grandTotalAmount: FormControl;

  // capture Fields
  subscriptionID: FormControl;
  captureAmount: FormControl;

  constructor(builder: FormBuilder, private paymentService: PaymentService) {

    // billTo 
    this.firstName = new FormControl('Sonu', [Validators.required]);
    this.lastName = new FormControl('Kapoor', [Validators.required]);
    this.street1 = new FormControl('129 Spadina Av', [Validators.required]);
    this.city = new FormControl('Toronto', [Validators.required]);
    this.state = new FormControl('ON', [Validators.required]);
    this.postalCode = new FormControl('M5V 2L3', [Validators.required]);
    this.country = new FormControl('CAD', [Validators.required]);
    this.email = new FormControl('sonu.kapoor@rangle.io', [Validators.required, ValidationService.emailValidator]);

    this.billTo = builder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      street1: this.street1,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      country: this.country,
      email: this.email
    });

    // Credit Card info
    this.accountNumber = new FormControl('4111111111111111', [Validators.required, ValidationService.creditCardValidator]);
    this.expirationMonth = new FormControl('10/2018', [Validators.required, ValidationService.ccMonthYearValidator]);
    this.cvNumber = new FormControl('123', [Validators.required]);

    this.card = builder.group({
      accountNumber: this.accountNumber,
      expirationMonth: this.expirationMonth,
      cvNumber: this.cvNumber
    });

    // Item info
    this.productCode = new FormControl('34526843', [Validators.required]);
    this.productName = new FormControl('RANGLEBOOK', [Validators.required]);
    this.productSKU = new FormControl('RNGBOOKNG2', [Validators.required]);
    this.quantity = new FormControl('1', [Validators.required]);
    this.unitPrice = new FormControl('0', [Validators.required]);

    this.item = builder.group({
      productCode: this.productCode,
      productName: this.productName,
      productSKU: this.productSKU,
      quantity: this.quantity,
      unitPrice: this.unitPrice
    });

    // PurchaseTotals info
    this.currency = new FormControl('USD', [Validators.required]);
    this.grandTotalAmount = new FormControl('1', [Validators.required]);

    this.purchaseTotals = builder.group({
      currency: this.currency,
      grandTotalAmount: this.grandTotalAmount
    });

    // Capture Fields
    this.subscriptionID = new FormControl('', [Validators.required]);
    this.captureAmount = new FormControl('', [Validators.required]);

    this.paymentForm = builder.group({
      billTo: this.billTo,
      card: this.card,
      item: this.item,
      purchaseTotals: this.purchaseTotals
    });
  }

  numberOnly(e) {
    // TODO: Need to change this. I really do not like this checks
    if (e.keyCode >= 48 && e.keyCode <= 57 ||
      e.keyCode == 8 || e.keyCode == 9 || (e.keyCode >= 37 && e.keyCode <= 40)) {
      return true;
    }
    else {
      return false;
    }
  }

  maskExpirationMonth(e) {

    if (e.keyCode == 8 || e.keyCode == 9 || (e.keyCode >= 37 && e.keyCode <= 40)) {
      return true;
    }

    let monthYear = this.expirationMonth.value;
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      if (monthYear.length == 2) {
        monthYear += "/20";
        this.paymentForm.patchValue({ card: { expirationMonth: monthYear } });
        return true;
      }
    }
    else {
      return false;
    }
  }

  authorize() {
    this.paymentService.authorize(this.paymentForm.value)
      .subscribe(
      result => {
        this.apiResponse = result
        this.subscriptionID.patchValue(result.requestID);
        this.captureAmount.patchValue(result.ccAuthReply.amount);
      },
      error => console.log(error));
  }

  capture() {
    this.paymentService.capture(this.subscriptionID.value)
      .subscribe(
      result => this.apiResponse = result,
      error => console.log(error));
  }
}
