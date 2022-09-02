import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Account } from "../model/account";
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  private url = "http://127.0.0.1:3000/auth"

  httpOptions: {
    headers : HttpHeaders
  } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  
  signup(user: Omit<Account,"school_id">): Observable<Account>{
    console.log('signup')
    console.log(user);
    return this.http
      .post<Account>(
        `${this.url}/signup`,
        user,
        this.httpOptions
      )
      .pipe(
        first(), //it will not need to unsubscribe from observable and it will just give back the first response...
        catchError(this.errorHandlerService.handleError<Account>("signup"))
      )
  }

  // signup(school_id: String, first_name: String, last_name: String, email: String, department: String, image: String, password: String) {
  //   const acc_json = {
  //     school_id: school_id,
  //     first_name: first_name,
  //     last_name: last_name,
  //     email: email,
  //     department: department,
  //     image: image,
  //     password: password
  //   }
  //   // print the values of acc_json
  //   console.log("acc====")
  //   console.log(acc_json)
  //   // return this.http
  //   //   .post<Account>(
  //   //     `${this.url}/signup`,
  //   //     acc_json,
  //   //     this.httpOptions
  //   // )
    
  // }

}
