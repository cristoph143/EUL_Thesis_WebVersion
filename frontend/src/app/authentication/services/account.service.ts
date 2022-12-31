import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { Account } from "../model/account";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
    providedIn: "root",
})
export class AccountService {
    private url = "http://localhost:3000/api/account";

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }
    
    // fetchAccount using school_id
    fetchAccountUsingId(school_id: Pick<Account, "school_id">): Observable<Account> {
        return this.http
            .get<Account>(`${this.url}/${school_id}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account>("fetchAccount")
                )
            );
    }
    
    // fetchAccount using school_id
    fetchAccount(school_id: any): Observable<Account> {
        return this.http
            .get<Account>(`${this.url}/${school_id}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account>("fetchAccount")
                )
            );
    }
    
    // fetchALlRoles
    fetchAllRoles() {
        return this.http
            .get(`${this.url}/roles`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account[]>("fetchAllRoles")
                )
            );
    }

    // fetchAllDepartments
    fetchAllDepartments(): Observable<Account[]> {
        return this.http
            .get<Account[]>(`${this.url}/departments`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account[]>(
                        "fetchAllDepartments"
                    )
                )
            );
    }

    // updateAccount
    updateAccount(school_id: string, account: any): Observable<Account> {
        return this.http
            .post<Account>(`${this.url}/update/${school_id}`, account, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account>("updateAccount")
                )
        );
    }


    // confirm password using school_id and password
    confirmPasswordUsingId(school_id: string, password: any): Observable<Account> {
        return this.http
            .post<Account>(`${this.url}/confirm`,
            {
              school_id,
              password
            },
                this.httpOptions
        )
        .pipe( 
            first(),
            catchError(
                this.errorHandlerService.handleError<Account>("confirmPasswordUsingId")
            )
        );        
    }

    // getAllSpecificRoles
    getAllSpecificRoles(role: string): Observable<Account[]> {
        return this.http
            .get<Account[]>(`${this.url}/role/${role}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account[]>(
                        "getAllSpecificRoles"
                    )
                )
            );
    }

    // getNumOfUser
    getNumOfUser(role: string): Observable<Account[]> {
        return this.http
            .get<Account[]>(`${this.url}/num_of_user/${role}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account[]>(
                        "getNumOfUser"
                    )
                )
            );
    }
}