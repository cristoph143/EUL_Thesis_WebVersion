import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Pending } from "../model/pending";

@Injectable({
    providedIn: "root",
})
export class PendingCrudService {
    private url = "http://localhost:3000/pending";

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: HttpClient
    ) { }
    
    // Fetch

    // fetch all accounts from Account
    fetchAllPending(): Observable<Pending[]> {
        return this.http
            .get<Pending[]>(this.url, { responseType: "json" })
            .pipe(
                tap((_) => console.log("fetched pending")),
                catchError(
                    this.errorHandlerService.handleError<Pending[]>("fetchAllPending")
                )
        );
    }

    // fetch account using school_id
    fetchPending(id: number): Observable<Pending> {
        const url = `http://localhost:3000/pending/${id}`;

        return this.http
            .get<Pending>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched pending")),
                catchError((
                    this.errorHandlerService.handleError<Pending>("fetchPending")
                )),
        );
    }

    // Post
    
    // create a new account
    createPending(pending: Pending): Observable<Pending> {
        return this.http
            .post<Pending>(this.url, pending, this.httpOptions)
            .pipe(
                tap((newPending: Pending) => console.log(`added pending w/ id=${newPending.id}`)),
                catchError(
                    this.errorHandlerService.handleError<Pending>("createPending")
                )
        );
    }


    // Update

    // Update role using school_id and role
    updatePending(id: number, pending: Pending): Observable<any> {
        const url = `http://localhost:3000/pending/${id}`;

        return this.http
            .put(url, pending, this.httpOptions)
            .pipe(
                tap(_ => console.log(`updated pending id=${id}`)),
                catchError(
                    this.errorHandlerService.handleError<any>("updatePending")
                )
        );
    }


    // Update approve using school_id and approve
    updateApprove(id: number, pending: Pending): Observable<any> {
        const url = `http://localhost:3000/pending/${id}`;

        return this.http
            .put(url, pending, this.httpOptions)
            .pipe(
                tap(_ => console.log(`updated pending id=${id}`)),
                catchError(
                    this.errorHandlerService.handleError<any>("updateApprove")
                )
        );
    }

    //Delete

    // Delete user when approve is true
    deletePending(id: number): Observable<Pending> {
        const url = `http://localhost:3000/pending/${id}`;

        return this.http
            .delete<Pending>(url, this.httpOptions)
            .pipe(
                tap(_ => console.log(`deleted pending id=${id}`)),
                catchError(
                    this.errorHandlerService.handleError<Pending>("deletePending")
                )
        );
    }
}