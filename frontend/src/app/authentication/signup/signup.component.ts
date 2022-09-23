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
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
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
    private uploadService: FileUploadService,
    private http: HttpClient
  ) { }
  
    baseUrl = 'http://localhost:3000';
  
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
    ),
    role: new FormControl(
      '',
      Validators.required,
    ),
  });

  departments = [
    'Senior High School', 'School of Allied Medical Sciences',
    'School of Arts and Sciences', 'School of Business and Management',
    'School of Computer Studies', 'School of Education', 'School of Engineering'
  ];

  roles = [
    'Student', 'Faculty'
  ];
  
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


  con = {};
  img!: File;

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
      password: this.secondFormGroup.value.password,
      role: this.secondFormGroup.value.role,
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

  selectFiles(event: any): void {
    // this.message = [];
    // this.progressInfos = [];
    // this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();
      console.log(this.selectedFiles[0]);
      this.img = this.selectedFiles[0];
    console.log(this.img, typeof(this.img));

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
          this.validImage = true;
        };

      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames.push(this.selectedFiles[0].name);
      this.url = this.selectedFiles[0].name;
      console.log(this.url)
    }
  }
}
