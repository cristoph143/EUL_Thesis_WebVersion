import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Account } from "../model/account";

@Injectable({
    providedIn: "root",
})
export class AccountCrudService {
    private url = "http://localhost:3000/account";

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: HttpClient
    ) { }

    // fetch all accounts from Account
    fetchAllAccounts(): Observable<Account[]> {
        return this.http
            .get<Account[]>(this.url, { responseType: "json" })
            .pipe(
                tap((_) => console.log("fetched accounts")),
                catchError(
                    this.errorHandlerService.handleError<Account[]>("fetchAllAccounts")
                )
            );
    }

    // fetch account using school_id
    fetchAccount(id: number): Observable<Account> {
        const url = `http://localhost:3000/account/${id}`;

        return this.http
            .get<Account>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched account")),
                catchError((
                    this.errorHandlerService.handleError<Account>("fetchAccount")
                )),
        );
    }

    // fetch name using name
    fetchName(name: string): Observable<Account> {
        const url = `http://localhost:3000/account/${name}`;

        return this.http
            .get<Account>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched account")),
                catchError((
                    this.errorHandlerService.handleError<Account>("fetchAccount")
                )),
        );
    }

    // login using email and password
    login(account: Account): Observable<any> {
        const url = `http://localhost:3000/account/login`;

        return this.http
            .post<Account>(url, account, this.httpOptions)
            .pipe(
                tap((_) => console.log("logged in")),
                catchError((
                    this.errorHandlerService.handleError<Account>("login")
                )),
        );
    }

    // fetch account using school_id and return boolean
    checkAccount(id: String): Observable<boolean> {
        const url = `http://localhost:3000/account/${id}`;

        return this.http
            .get<boolean>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched account")),
                catchError((
                    this.errorHandlerService.handleError<boolean>("checkAccount")
                )),
        );
    }

    // get password using email
    getPassword(email: string): Observable<string> {
        const url = `http://localhost:3000/account/${email}`;
        
        return this.http
            .get<string>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched password")),
                catchError((
                    this.errorHandlerService.handleError<string>("getPassword")
                )),
        );
    }

    // Post

    // create new account
    createAccount(account: Partial<Account>): Observable<Account> {
        return this.http
            .post<Account>(this.url, account, this.httpOptions)
            .pipe(
                tap((_) => console.log("created account")),
                catchError((
                    this.errorHandlerService.handleError<Account>("createAccount")
                )),
        );
    }

    // Update

    // update profile using school_id
    updateProfile(id: number, account: Partial<Account>): Observable<Account> {
        const url = `http://localhost:3000/account/${id}`;

        return this.http
            .put<Account>(url, account, this.httpOptions)
            .pipe(
                tap((_) => console.log("updated account")),
                catchError((
                    this.errorHandlerService.handleError<Account>("updateProfile")
                )),
        );
    }

    // Delete

    // detele account using school_id
    deleteAccount(id: number): Observable<any> {
        const url = `http://localhost:3000/account/${id}`;

        return this.http
            .delete<Account>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("deleted account")),
                catchError((
                    this.errorHandlerService.handleError<Account>("deleteAccount")
                )),
        );
    }
}