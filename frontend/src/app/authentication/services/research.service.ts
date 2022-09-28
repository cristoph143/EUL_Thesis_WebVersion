import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { ResearchDetails } from "../model/research_details";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
    providedIn: "root",
})
export class ResearchService {
    private url = "http://localhost:3000/api";

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    // fetchResearch
    fetchAllResearch(): Observable<ResearchDetails> {
        return this.http
            .get<ResearchDetails>(`${this.url}/research/fetchAllResearchList`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("fetchAccount")
                )
            );
    } 
    
    // // fetchAccount using school_id
    // fetchAllResearch(research_id: Pick<ResearchDetails, "research_id">): Observable<ResearchDetails> {
    //     return this.http
    //         .get<ResearchDetails>(`${this.url}/${research_id}`, this.httpOptions)
    //         .pipe(
    //             first(),
    //             catchError(
    //                 this.errorHandlerService.handleError<ResearchDetails>("fetchAccount")
    //             )
    //         );
    // } 
}