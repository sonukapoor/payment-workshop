import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import MaskedInput from 'angular2-text-mask'
import { AppComponent } from './app.component';
import { PaymentService } from './payment.service';

@NgModule({
  declarations: [
    AppComponent, MaskedInput
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
