import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { ResearchDetails } from "../model/research_details";
import { ErrorHandlerService } from "./error-handler.service";
import { Account } from "../model/account";

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

    // fetchResearch
    fetchAllLibrary(school_id: any): Observable<ResearchDetails> {
        return this.http
            .get<ResearchDetails>(`${this.url}/research/fetchLibrary/${school_id}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("fetchAccount")
                )
            );
    } 

    addResearch(research: ResearchDetails): Observable<ResearchDetails> {
        return this.http
            .post<ResearchDetails>(`${this.url}/research/addResearchDetails`, research, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("addResearch")
                )
            );
    }
    
    // update research
    updateResearch(research: ResearchDetails): Observable<ResearchDetails> {
        return this.http
            .put<ResearchDetails>(`${this.url}/research/updateResearchDetails`, research, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("updateResearch")
                )
            );
    }

    // delete research
    deleteResearch(research_id: Pick<ResearchDetails, "research_id">): Observable<ResearchDetails> {
        return this.http
            .delete<ResearchDetails>(`${this.url}/research/deleteResearch/${research_id}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("deleteResearch")
                )
            );
    }

    // add number_of_views using research_id
    addNumberOfViews(research_id: Pick<ResearchDetails, "research_id">): Observable<ResearchDetails> {
        return this.http
            .get<ResearchDetails>(`${this.url}/research/incrementViews/${research_id}`, this.httpOptions)
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("addNumberOfViews")
                )
            );
    }
}