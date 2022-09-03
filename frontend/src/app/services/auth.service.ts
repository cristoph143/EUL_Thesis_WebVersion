import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Account } from "../model/account";
import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
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

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<Account, "school_id">;

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

  login(
    school_id: Pick<Account, "school_id">,
    password: Pick<Account, "password">
  ): Observable<{
    token: string,
    userid: Pick<Account, "school_id">
  }> {
    console.log('login');
    return this.http
      .post(
        `${this.url}/login`,
        {
          school_id,
          password
        },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.userId = tokenObject.userid;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string,
            userid: Pick<Account, "school_id">
          }>()
        )
      ) 
  }


  // login(
  //   school_id: Pick<Account, "school_id">,
  //   password: Pick<Account, "password">
  // ): Observable<{
  //   token: string,
  //   userid: Pick<Account, "school_id">
  // }> {
  //   console.log('login');
  //   return this.http
  //     .post(
  //       `${this.url}/login`,
  //       {
  //         school_id,
  //         password
  //       },
  //       this.httpOptions
  //     )
  //     .pipe(
  //       first(),
  //       tap((
  //         tokenObject: {
  //           token: string,
  //           userid: Pick<Account, "school_id">
  //       }) => {
  //         this.userId = tokenObject.userid;
  //         localStorage.setItem("token", tokenObject.token);
  //         this.isUserLoggedIn$.next(true);
  //       }),
  //       catchError(
  //         this.errorHandlerService.handleError<{
  //           token: string,
  //           userid: Pick<Account, "school_id">
  //         }>()
  //       )
  //     ) 
  // }

}
