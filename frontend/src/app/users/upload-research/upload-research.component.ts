import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../../authentication/services/file.service';
import { saveAs } from 'file-saver';
import { Injector } from '@nestjs/core/injector/injector';

const uri = 'http://localhost:3000/file/upload-file';
@Component({
  selector: 'app-upload-research',
  templateUrl: './upload-research.component.html',
  styleUrls: ['./upload-research.component.css'],
    providers:[FileService]
})

export class UploadResearchComponent implements OnInit{


  uploader: FileUploader = new FileUploader({ url: uri });
  research_id: string = '';
  
  attachmentList:any = [];
  constructor(private fileService:FileService){
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.attachmentList.push(JSON.parse(response));
    }
  }

  ngOnInit(): void {
    
  }

  isLinear = false;
  download(index: string | number){
    var filename = this.attachmentList[index].uploadname;

    this.fileService.downloadFile(filename)
    .subscribe(
        (data: any) => {
        return saveAs(data, filename);
      },
        (error: any) => {
          return console.error(error);
        }
    );
  }

  selectFiles(event: any) {
    // if attachmentList has one file, then remove it
    if (this.attachmentList.length > 0) {
      this.attachmentList = [];
    }
    // insert to attachmentList
    for (var i = 0; i < event.target.files.length; i++) {
      this.attachmentList.push(event.target.files[i]);
    }
    console.log(this.attachmentList);
    console.log(this.attachmentList[0].name);
  }

  removeFile(_t18: any) {
    this.attachmentList = [];
    // clear the input file
    var fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.value = '';

  }

  uploadFiles() {
    for (var i = 0; i < this.attachmentList.length; i++) {
      this.upload(this.attachmentList[i]);
    }
  }

  uploading: boolean = true;
  formData = new FormData();
  
  upload(file: any) {
    this.formData.append('file', file);
    const research_id = this.random_uiD();
    this.research_id = research_id;
    this.formData.append('research_id', research_id);
    console.log(research_id, 'upload');
    this.fileService.uploadFile(this.formData).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  random_uiD() {
    let research_id = '';
    research_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    console.log(research_id, 'random_uiD');
    return research_id;
  }

  upNext(){
    console.log(this.formData.get('file'), 'upNext');
    console.log(this.formData.get('research_id'), 'upNext');
  }
    
}
