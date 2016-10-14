import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
  private baseUrl: string = 'http://localhost:8000/api';
  constructor(private http: Http) {
  }

  authorize(cc): Observable<any> {
    let body = cc;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`${this.baseUrl}/authorize`, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  capture(subscriptionID): Observable<any> {
    let body = "subscriptionID=" + subscriptionID;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`${this.baseUrl}/capture`, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private clone(object: any) {
    // hack
    return JSON.parse(JSON.stringify(object));
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}