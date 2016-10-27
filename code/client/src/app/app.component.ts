import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { PaymentService } from './payment.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'
import { TransactionType } from './shared/TransactionType'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Credit Card Tester';
  apiResponse: any = null;
  subscription: any = null;

  public TransactionTypes: typeof TransactionType = TransactionType;
  selectedTransactionType: TransactionType;

  numberMask = createNumberMask({
    prefix: '',
    suffix: '  $'
  })

  paymentForm: FormGroup;
  merchantReferenceCode: FormControl;

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
  captureFields: FormGroup;
  subscriptionID: FormControl;
  captureAmount: FormControl;
  captureCurrency: FormControl;

  constructor(private builder: FormBuilder, private paymentService: PaymentService) {

    this.selectedTransactionType = TransactionType.AUTHORIZATION;
    this.merchantReferenceCode = new FormControl('TEST', [Validators.required]);

    this.createBillToFormFields();
    this.createCCFormFields();
    this.createItemFormFields();
    this.createPurchaseTotalsFields();
    this.createCaptureFields();
    this.setSubscription();
  }

  private createBillToFormFields() {
    // billTo 
    this.firstName = new FormControl('Sonu', [Validators.required]);
    this.lastName = new FormControl('Kapoor', [Validators.required]);
    this.street1 = new FormControl('129 Spadina Av', [Validators.required]);
    this.city = new FormControl('Toronto', [Validators.required]);
    this.state = new FormControl('ON', [Validators.required]);
    this.postalCode = new FormControl('M5V 2L3', [Validators.required]);
    this.country = new FormControl('CA', [Validators.required]);
    this.email = new FormControl('sonu.kapoor@rangle.io', [Validators.required, ValidationService.emailValidator]);

    this.billTo = this.builder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      street1: this.street1,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      country: this.country,
      email: this.email
    });
  }

  private createCCFormFields() {
    // Credit Card info
    this.accountNumber = new FormControl('4111111111111111', [Validators.required, ValidationService.creditCardValidator]);
    this.expirationMonth = new FormControl('10/2018', [Validators.required, ValidationService.ccMonthYearValidator]);
    this.cvNumber = new FormControl('123', [Validators.required]);

    this.card = this.builder.group({
      accountNumber: this.accountNumber,
      expirationMonth: this.expirationMonth,
      cvNumber: this.cvNumber
    });
  }

  private createItemFormFields() {
    // Item info
    this.productCode = new FormControl('34526843', [Validators.required]);
    this.productName = new FormControl('RANGLEBOOK', [Validators.required]);
    this.productSKU = new FormControl('RNGBOOKNG2', [Validators.required]);
    this.quantity = new FormControl('1', [Validators.required]);
    this.unitPrice = new FormControl('100', [Validators.required]);

    this.item = this.builder.group({
      productCode: this.productCode,
      productName: this.productName,
      productSKU: this.productSKU,
      quantity: this.quantity,
      unitPrice: this.unitPrice
    });
  }

  private createPurchaseTotalsFields() {
    // PurchaseTotals info
    this.currency = new FormControl('USD', [Validators.required]);
    this.grandTotalAmount = new FormControl('100', [Validators.required]);

    this.purchaseTotals = this.builder.group({
      currency: this.currency,
      grandTotalAmount: this.grandTotalAmount
    });
  }

  private createCaptureFields() {
    // Capture Fields
    this.subscriptionID = new FormControl('', [Validators.required]);
    this.captureAmount = new FormControl('', [Validators.required]);
    this.captureCurrency = new FormControl('USD', [Validators.required]);

    this.captureFields = this.builder.group({
      merchantReferenceCode: this.merchantReferenceCode.value,
      currency: this.captureCurrency,
      requestID: this.subscriptionID,
      grandTotalAmount: this.captureAmount
    });

    this.paymentForm = this.builder.group({
      merchantReferenceCode: this.merchantReferenceCode,
      billTo: this.billTo,
      card: this.card,
      item: this.item,
      purchaseTotals: this.purchaseTotals
    });
  }

  private setSubscription() {
    this.subscription = {
      merchantReferenceCode: this.merchantReferenceCode.value,
      currency: this.captureCurrency.value,
      grandTotalAmount: this.captureAmount.value.replace("$", "").trim(), // TODO: @RANGLE - there is probably a better way to do this?
      requestID: this.subscriptionID.value
    };
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
    let monthYear = this.expirationMonth.value;
    let month = monthYear.split("/")[0];
    let year = monthYear.split("/")[1];
    this.paymentForm.patchValue({ card: { expirationYear: year } });

    this.paymentService.authorize(this.paymentForm.value)
      .subscribe(
      result => {
        this.apiResponse = result
        if (result.decision === "ACCEPT") {
          this.subscriptionID.patchValue(result.requestID);
          this.captureAmount.patchValue(result.ccAuthReply.amount);
        }
      },
      error => console.log(error));
  }

  capture() {
    this.subscription = {
      merchantReferenceCode: this.merchantReferenceCode.value,
      currency: this.currency.value,
      grandTotalAmount: this.captureAmount.value.replace("$", "").trim(),
      requestID: this.subscriptionID.value
    };

    this.paymentService.capture(this.subscription)
      .subscribe(
      result => this.apiResponse = result,
      error => console.log(error));
  }
}
