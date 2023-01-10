import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from "../../model/account";
import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  private url = "http://127.0.0.1:3000/auth"

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
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
          const token = tokenObject.token;
          const parseToken = this.parseJwt(token);
          console.log(parseToken)
          // copy value from parseToken to new variable
          const tokenString = JSON.stringify({
            school_id: parseToken.school_id,
            email: parseToken.email,
            role: parseToken.role,
            approve: parseToken.approve,
            exp: parseToken.exp,
            expiresIn: parseToken.expiresIn,
            iat: parseToken.iat
          })
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("token", tokenString);
          // store user details and jwt token in session storage to keep user logged in between page refreshes
          sessionStorage.setItem("token", tokenString);
          // print the expiration
          this.isUserLoggedIn$.next(true);
          // this.isUserLoggedIn$ = true;
          this.school_id = school_id;
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
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  
  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}