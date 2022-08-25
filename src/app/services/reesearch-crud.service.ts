import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { ResearchDetails } from "../model/research_details";

@Injectable({
    providedIn: "root",
})
export class ResearchCrudService {
    private url = "http://localhost:3000/research";

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: HttpClient
    ) { }

    // Fetch

    // fetch all research papers from Research_Paper
    fetchAllResearchPapers(): Observable<ResearchDetails[]> {
        return this.http
            .get<ResearchDetails[]>(this.url, { responseType: "json" })
            .pipe(
                tap((_) => console.log("fetched research papers")),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails[]>("fetchAllResearchPapers")
                )
        );
    }

    // fetch research paper using id
    fetchResearchPaper(id: number): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${id}`;

        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchResearchPaper")
                )),
        );
    }


    // fetch research paper using title
    fetchTitle(title: string): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${title}`;
        
        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchTitle")
                )),
        );
    }

    // fetch research paper using adviser
    fetchAdviser(adviser: string): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${adviser}`;

        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchAdviser")
                )),
        );
    }

    // fetch research paper using authors
    fetchAuthors(authors: string[]): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${authors}`;

        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchAuthors")
                )),
        );
    }


    // fetch research paper using keywords
    fetchKeywords(keywords: string[]): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${keywords}`;

        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchKeywords")
                )),
        );
    }

    // fetch research paper using department
    fetchDepartment(department: string): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${department}`;

        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchDepartment")
                )),
        );
    }

    // fetch research paper using qr
    fetchQr(qr: string): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${qr}`;

        return this.http
            .get<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("fetched research paper")),
                catchError((
                    this.errorHandlerService.handleError<ResearchDetails>("fetchQr")
                )),
        );
    }

    // Post

    // create new research paper
    createResearchPaper(researchPaper: ResearchDetails): Observable<ResearchDetails> {
        return this.http
            .post<ResearchDetails>(this.url, researchPaper, this.httpOptions)
            .pipe(
                tap((_) => console.log("created research paper")),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("createResearchPaper")
                )
        );
    }

    // Update

    // Update number of views using qr
    updateViews(qr: string, views: number): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${qr}`;

        return this.http
            .put<ResearchDetails>(url, views, this.httpOptions)
            .pipe(
                tap((_) => console.log("updated research paper")),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("updateViews")
                )
        );
    }

    // Update research paper using id
    updateResearchPaper(id: number, researchPaper: ResearchDetails): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${id}`;

        return this.http
            .put<ResearchDetails>(url, researchPaper, this.httpOptions)
            .pipe(
                tap((_) => console.log("updated research paper")),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("updateResearchPaper")
                )
        );
    }

    // Delete

    // Delete research paper using id
    deleteResearchPaper(id: number): Observable<ResearchDetails> {
        const url = `http://localhost:3000/research/${id}`;

        return this.http
            .delete<ResearchDetails>(url, this.httpOptions)
            .pipe(
                tap((_) => console.log("deleted research paper")),
                catchError(
                    this.errorHandlerService.handleError<ResearchDetails>("deleteResearchPaper")
                )
        );
    }

}