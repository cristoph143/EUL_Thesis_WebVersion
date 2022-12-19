import { AuthInterceptorService } from './auth-interceptor.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";
import { Account } from "../model/account";
import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

import { Inject} from "@angular/core";
// import { LibraryConfig } from "../model/config";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private authInt: AuthInterceptorService,
    private tokenStorage: TokenStorageService
    // @Inject('config') private config: LibraryConfig) {}
  ) {}

  private url = "http://127.0.0.1:3000/auth"

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  // isUserLoggedIn$ = false;
  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;
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

  currUser: any;
  token: any;

  login(
    school_id: Pick<Account, "school_id">,
    password: Pick<Account, "password">
  ): Observable<{
    token: string,
    school_id: Pick<Account, "school_id">
  }> {
    console.log('login');
    const user = this.http
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
          this.token = tokenObject.token;
          const token = tokenObject.token;
          // concat school_id and token into string
          const tokenString = JSON.stringify({school_id, token});
          localStorage.setItem("token", tokenString);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("token", tokenString);
          // store user details and jwt token in session storage to keep user logged in between page refreshes
          sessionStorage.setItem("token", tokenString);
          // print the expiration
          console.log(tokenObject.expiresIn + "hhhh");
          this.isUserLoggedIn$.next(true);
          // this.isUserLoggedIn$ = true;
          this.school_id = school_id;
          console.log('sdd=>', this.school_id);
          // if tokenObject.approve is equal to 0 then redirect to approve
          if (tokenObject.approve === 0) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            this.router.navigate(["approve"]);
          } else {
            this.router.navigate(["home"]);
          }
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string,
            school_id: Pick<Account, "school_id">
          }>()
        ),
    ) 
    this.currUser = user;
    console.log(this.currUser,"djsjsdj");
    return this.currUser;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  getLoggedUser(): Account {
      // Perform localStorage action
      const item = localStorage.getItem('token');
      // if item is not null return parse
      return item ? JSON.parse(item) : null;
    // return JSON.parse(localStorage.getItem("token", null));
  }

  isUserAuthenticated(): boolean {
    console.log(!!localStorage.getItem("token"));
    return !!localStorage.getItem("token");
  }
}
