import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class FileService {


    constructor(private _http: HttpClient) { }

    private baseUrl = 'http://localhost:3000/file';

    // httpOtions for multipart/form-data
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        })
    }

    downloadFile(research_id: string) {
        return this._http.get(`${this.baseUrl}/download/${research_id}`,
            { responseType: 'blob' as 'json' }
        );
    }

    uploadFile(formData: FormData) {
        // extract and print the formData
        console.log(formData.get('file'));
        console.log(formData.get('research_id'));
        console.log(formData)
        // return this._http.post('http://localhost:3000/file/upload-file', formData, {
        //     reportProgress: true,
        //     observe: 'events'
        // });
        let id = formData.get('research_id');
        const req = new HttpRequest('POST', `${this.baseUrl}/upload-file/${id}`, formData, {
            reportProgress: true,
            responseType: 'json',
        });
        // const req = new HttpRequest('POST', `${this.baseUrl}/upload-file`, formData, {
        //     reportProgress: true,
        //     responseType: 'json',
        // });
        console.log(req);

        return this._http.request(req);
    }
    uploadProfile(formData: FormData) {
        // extract and print the formData
        console.log(formData.get('file'));
        console.log(formData.get('school_id'));
        console.log(formData)
        // return this._http.post('http://localhost:3000/file/upload-file', formData, {
        //     reportProgress: true,
        //     observe: 'events'
        // });
        let id = formData.get('school_id');
        const req = new HttpRequest('POST', `http://localhost:3000/image/upload-avatar/${id}`, formData, {
            reportProgress: true,
            responseType: 'json',
        });
        console.log(req);

        return this._http.request(req);
    }
}