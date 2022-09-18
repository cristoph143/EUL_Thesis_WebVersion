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
    private url = "http://localhost:3000/post";

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }
    
    // fetchAccount using school_id
    fetchAccount(school_id: Pick<Account, "school_id">): Observable<Account> {
        return this.http
            .get<Account>(`${this.url}/${school_id}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<Account>("fetchAccount")
                )
            );
    } 
}