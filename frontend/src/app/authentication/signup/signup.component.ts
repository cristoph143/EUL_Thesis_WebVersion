import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FloatLabelType } from '@angular/material/form-field';
import { FileUploadService } from '../services/file-upload.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    // private AccountCrudService: AccountCrudService,
    private router: Router,
    private toast: HotToastService,
    private _formBuilder: FormBuilder,
    private uploadService: FileUploadService) { }
  
    fileName = '';

    imagePath = "";
    url: any;
    // message: String = "";
    validImage: boolean = false;

    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
  
    progressInfos: any[] = [];
    message: string[] = [];
  
    previews: string[] = [];
    imageInfos?: Observable<any>;
  
  
    isLinear = false;
    hide = true;
  firstFormGroup: FormGroup = new FormGroup({
    first_name: new FormControl(
          '',
          Validators.required,
    ),
    last_name: new FormControl(
          '',
          Validators.required,
    ),
    email: new FormControl(
          '',
          Validators.required
    ),
    department: new FormControl(
          '',
          Validators.required
    ),
  });
  
  
  secondFormGroup: FormGroup = new FormGroup({
    school_id: new FormControl(
      '',
      Validators.required,
    ),
    password: new FormControl(
      '',
      Validators.required,
      // pattern with regex for password
    ),
    confirm_password: new FormControl(
      '',
      Validators.required,
    )
  });
  
    hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto' as FloatLabelType);
  
    options = this._formBuilder.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  
    getFloatLabelValue(): FloatLabelType {
      return this.floatLabelControl.value || 'auto';
    }

  

  ngOnInit(): void {
    this.isLinear = true;
    this.imageInfos = this.uploadService.getFiles();
  }

  // registerForm: FormGroup = new FormGroup({
  //   first_name: new FormControl(
  //     '',
  //     Validators.required,
  //   ),
  //   last_name: new FormControl(
  //     '',
  //     Validators.required,
  //   ),
  //   school_id: new FormControl(
  //     '',
  //     Validators.required,
  //   ),
  //   password: new FormControl(
  //     '',
  //     Validators.required,
  //     // pattern with regex for password
  //   ),
  //   confirm_password: new FormControl(
  //     '',
  //     Validators.required
  //   ),
  //   email: new FormControl(
  //     '',
  //     Validators.required
  //   ),
  //   department: new FormControl(
  //     '',
  //     Validators.required
  //   ),
  //   image: new FormControl(
  //     '',
  //     Validators.required
  //   ),
  // })

  con = {};


  onSubmitRegister() {
    console.log(this.secondFormGroup.value)
    if (!this.secondFormGroup.valid) {
      this.toast.error("Invalid Registration");
      return;
    }

    // const acc = {
    //   school_id: this.registerForm.value.school_idRegister,
    //   first_name: this.registerForm.value.first_nameRegister,
    //   last_name: this.registerForm.value.last_nameRegister,
    //   email: this.registerForm.value.emailRegister,
    //   department: this.registerForm.value.departmentRegister,
    //   image: this.registerForm.value.imageRegister,
    //   password: this.registerForm.value.passwordRegister
    // }

    const acc = {
      school_id: this.secondFormGroup.value.school_id,
      first_name: this.firstFormGroup.value.first_name,
      last_name: this.firstFormGroup.value.last_name,
      email: this.firstFormGroup.value.email,
      department: this.firstFormGroup.value.department,
      image: this.url,
      password: this.secondFormGroup.value.password
    }

    console.log(acc)
    this.con = acc;
    
    
    this.authService
      .signup(
        acc
      )
      .pipe(
        this.toast.observe({
          success: 'Registered Sucessfully',
          loading: 'Loading',
          error: (msg) => msg
        })
      )
      .subscribe(
        (msg) =>
          console.log(msg)
      );
  }

  nav(dest: string) {
    this.router.navigate([dest]);
  }



  // onFileChanged(event:any) {
  //   const files = event.target.files;
  //   if (files.length === 0)
  //     return;

  //   const mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     alert(this.message)
  //     return;
  //   }
    

  //   const reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.url = reader.result;
  //     this.validImage = true;
  //   }
  // }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          alert(this.message)
        }
      );
      this.validImage = true;
    }
    console.log(file.name)
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
}
