import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Pending } from "../model/pending";
import { AnonymousSubject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: "root",
})
export class PendingCrudService {
    
    // private url = "http://127.0.0.1:3006/pending";
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
        console.log('Welcome')
        return this.http
            .get<Pending[]>(this.url, { responseType: "json" })
            .pipe(
                tap((_) => console.log("fetched pending")),
                catchError(
                    this.errorHandlerService.handleError<Pending[]>("fetchAllPending",)
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
    createPending(pending: Partial<Pending>): Observable<any>  {
        // print pending into json form
        console.log(pending + "pending");
        return this.http
            .post<Pending>(this.url, pending, this.httpOptions)
            .pipe(
                tap((
                    newPending: Pending
                ) =>
                    console.log(`added pending w/ id=${newPending.school_id}`)),
                catchError(
                    this.errorHandlerService.handleError<any>("createPending")
                )
        );
    }
    // createPending(arg0: { pending: { email: any; school_id: any; role: any; approve: boolean; }; }) {
    //     return this.http
    //         .post<Pending>(this.url, arg0, this.httpOptions)
    //         .pipe(
    //             tap((newPending: Pending) => console.log(`added pending w/ id=${newPending.school_id}`)),
    //             catchError(
    //                 this.errorHandlerService.handleError<Pending>("createPending")
    //             )
    //     );
    //   }


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