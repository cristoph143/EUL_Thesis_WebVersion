import { Component, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../../authentication/services/file.service';
import { saveAs } from 'file-saver';
import { Injector } from '@nestjs/core/injector/injector';

const uri = 'http://localhost:3000/file/upload';
@Component({
  selector: 'app-upload-research',
  templateUrl: './upload-research.component.html',
  styleUrls: ['./upload-research.component.css'],
    providers:[FileService]
})

export class UploadResearchComponent implements OnInit{

  uploader:FileUploader = new FileUploader({url:uri});
  
  attachmentList:any = [];
  constructor(private fileService:FileService){
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
        this.attachmentList.push(JSON.parse(response));
    }
  }

  ngOnInit(): void {
    
  }

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
}
