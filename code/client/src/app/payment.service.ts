import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
  private baseUrl: string = 'http://localhost:8000/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor( @Inject(Http) private http: Http) {
  }

  authorize(cc): Observable<any> {
    let body = cc;

    let monthYear = cc.card.expirationMonth;
    let month = monthYear.split("/")[0];
    let year = monthYear.split("/")[1];

    cc.card.expirationMonth = month;
    cc.card.expirationYear = year;

    return this.http
      .post(`${this.baseUrl}/authorize`, JSON.stringify(body), { headers: this.headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  capture(subscription): Observable<any> {
    let body = subscription;
    return this.http
      .post(`${this.baseUrl}/capture`, JSON.stringify(body), { headers: this.headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  private clone(object: any) {
    // hack
    return JSON.parse(JSON.stringify(object));
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get  a better message
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}