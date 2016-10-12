import { Injectable } from '@angular/core';
//import { Person } from './person';
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
    //headers.append('Content-Type', 'application/json');
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


















/*
function mapPersons(response:Response): Person[]{
   // The response of the API has a results
   // property with the actual results
   return response.json().results.map(toPerson)
}

function toPerson(r:any): Person{
  let person = <Person>({
    id: extractId(r),
    url: r.url,
    name: r.name,
    weight: r.mass,
    height: r.height,
  });
  console.log('Parsed person:', person);
  return person;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
 let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
 return parseInt(extractedId);
}

function mapPerson(response:Response): Person{
   // toPerson looks just like in the previous example
   return toPerson(response.json());
}
*/

// this could also be a private method of the component class
function handleError(error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}