import { Component, OnInit } from '@angular/core';
import { FileUploader} from 'ng2-file-upload';
import { FileService } from '../../authentication/services/file.service';
import { saveAs } from 'file-saver';
import { Injector } from '@nestjs/core/injector/injector';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResearchService } from 'src/app/authentication/services/research.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AccountService } from '../../../app/authentication/services/account.service';
import { first } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

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
  constructor(private fileService: FileService,
    private account_service: AccountService,
    private toast: HotToastService,
    private researchService: ResearchService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.attachmentList.push(JSON.parse(response));
    }
  }

  disabled = true;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type = 
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.school_id = type;
    this.getDepartment();
  }

  departments: any;

  private getDepartment() {
    this.account_service.fetchAllDepartments().subscribe((data: any) => {
      this.departments = data[0];
      console.log(data[0])
    });
  }

  school_id: any;
  research_ids: string = this.random_uiD();


  researchForm = new FormGroup({
    // [research_id, topic category, sdg category,date_published, adviser, department, keywords, title, abstract, qr, number_of_view ]
    research_id: new FormControl('', Validators.required),
    topic_category: new FormControl('', Validators.required),
    sdg_category: new FormControl('', Validators.required),
    date_published: new FormControl('', Validators.required),
    adviser: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    keywords: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    abstract: new FormControl('', Validators.required),
    qr: new FormControl('', Validators.required),
    number_of_view: new FormControl('', Validators.required),
  });


  research_details = {
    research_id: this.research_ids,
    title: 'Confused Title',
    abstract: 'Lorem Ipsum is simply dummy text of versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    topic_category: ['topic1', 'topic2', 'topic3'],
    sdg_category: ['sdg1', 'sdg2', 'sdg3'],
    qr: 'hshdhdshsd',
    adviser: 'adviser',
    date_published: '2021-01-01',
    departmentID: 1,
    departmentName: "School of Computer Studies",
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    number_of_view: 0,
  }

  gotoHome() {
    window.location.href = '/home';
  }

  addResearch() {
    let topic_category = this.research_details.topic_category;
    let sdg_category = this.research_details.sdg_category;
    let keywords = this.research_details.keywords;
    // create new object
    let new_research_details = {
      research_id: this.research_details.research_id,
      topic_category: topic_category,
      sdg_category: sdg_category,
      date_published: this.research_details.date_published,
      adviser: this.research_details.adviser,
      departmentID: this.research_details.departmentID,
      title: this.research_details.title,
      abstract: this.research_details.abstract,
      keywords: keywords,
      qr: this.research_details.qr,
      number_of_view: this.research_details.number_of_view,
    }
    this.researchService.addResearch(new_research_details).subscribe(
      (data: any) => {
        console.log(data);
        this.uploadFiles();
        this.toast.success('Research successfully added');
        // iterate authors
        for (var i = 0; i < this.authors.length; i++) {
          // get school_id
          let school_id = this.authors[i].school_id;
          this.addAuthored(school_id)
        }
      },
      (error: any) => {
        console.log(error);
      }
    );

    /*TODO - add research to database not successfull */

  }

  authors: any = [];


  uploadFiles() {
    for (var i = 0; i < this.attachmentList.length; i++) {
      this.upload(this.attachmentList[i]);
    }
  }
  display = false;
  authorForm = new FormGroup({
    school_id: new FormControl('', Validators.required),
  });

  pushAuthor() {
    console.log(this.authors)
    // return error if form is invalid
    if (this.authorForm.invalid) {
      // toast error
      this.toast.error('Please fill out all fields');
      // this.display = false;
      return;
    }

    // check if input school_id already exist in the form
    for (var i = 0; i < this.authors.length; i++) {
      if (this.authors[i].school_id == this.authorForm.value.school_id) {
        this.toast.error('School ID already exist');
        return;
      }
    }
    

    this.account_service.fetchAccount(this.authorForm.value.school_id).subscribe((data: any) => {
      if (data[0].length == 0) {
        this.toast.error('School ID does not exist');
        return;
      }
      console.log(data[0])
      const author = {
        first_name: data[0][0].first_name,
        last_name: data[0][0].last_name,
        school_id: this.authorForm.value.school_id,
      }
  
      this.authors.push(author);
      this.authorForm.reset();
      this.display = true;
    });
  }

  removeAuthor(i: any) {
    // confirm if want to remove
    console.log(this.authors)
    const con = confirm('Are you sure you want to remove this author ?');
    if (con == false) {
      return;
    }
    this.authors.splice(i, 1);
  }



  // addAuthored
  addAuthored(school_id: any) {
    let research_id = this.research_details.research_id;
    this.researchService.addAuthored(research_id, school_id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
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
    this.disabled = false;
  }


  removeFile(_t18: any) {
    this.attachmentList = [];
    // clear the input file
    var fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.value = '';
  }


  uploading: boolean = false;
  formData = new FormData();
  progress: any;
  
  upload(file: any) {
    this.formData.append('file', file);
    const research_id = this.research_ids;
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
    console.log(this.attachmentList, 'upNext');
  }

  onSubmitDetails() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.researchForm.value, null, 4));
    console.log(this.researchForm.value, 'onSubmitDetails');
  }
    
}
