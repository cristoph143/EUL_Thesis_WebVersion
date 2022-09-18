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

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    // @Inject('config') private config: LibraryConfig) {}
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
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.school_id = school_id;
          console.log('sdd=>',this.school_id);
          this.router.navigate(["home"]);
          // alert("Successfully logged in");
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string,
            userid: Pick<Account, "school_id">
          }>()
        ),
    ) 
    return user;
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
    return !!localStorage.getItem("token");
  }
}
