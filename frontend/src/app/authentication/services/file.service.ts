import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()

export class FileService {
    

    constructor(private _http: HttpClient) { }
    
  private baseUrl = 'http://localhost:3000/file';
    
    // httpOtions for multipart/form-data
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        })
    }

    downloadFile(file:String){
        var body = {filename:file};

        return this._http.post('http://localhost:3000/file/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
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
    

}