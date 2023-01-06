import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/core/auth.service';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FloatLabelType } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { FileService } from '../services/file.service';
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
    private router: Router,
    private toast: HotToastService,
    private _formBuilder: FormBuilder,
    private fileService: FileService,
    private account_service: AccountService,
  ) { }

  ngOnInit(): void {
    this.isLinear = true;
    this.getRole();
    this.getDepartment();
  }

  baseUrl = 'http://localhost:3000';
  fileName = '';
  imagePath = "";
  url: any;
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
      Validators.required,
    ),
    department: new FormControl(
          '',
          Validators.required
    ),
    image: new FormControl(
      [null],
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

  departments: any;
  roles: any;
  
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  
  private getRole() {
    this.account_service.fetchAllRoles().subscribe((data: any) => {
      this.roles = data[0];
      this.roles = data[0].filter((role: any) => role.roleID !== 1 && role.roleID !== 2);
    });
  }

  private getDepartment() {
    this.account_service.fetchAllDepartments().subscribe((data: any) => {
      this.departments = data[0];
    });
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  private formSubmitAttempt: boolean = false;
  isFieldInvalid(field: string, form: string) {
    form = form + 'FormGroup';
    if (form == 'firstFormGroup') {
      return (
        (!this.firstFormGroup.get(field)?.valid && this.firstFormGroup.get(field)?.touched) ||
        (this.firstFormGroup.get(field)?.untouched && this.formSubmitAttempt)
      );
    }
      return (
        (!this.secondFormGroup.get(field)?.valid && this.secondFormGroup.get(field)?.touched) ||
        (this.secondFormGroup.get(field)?.untouched && this.formSubmitAttempt)
      );
  }

  con = {};
  img!: File;
  formData = new FormData();

  onSubmitRegister(): void {
    if (!this.secondFormGroup.valid) {
      this.toast.error("Invalid Registration");
      return;
    }

    if (this.secondFormGroup.value.password !== this.secondFormGroup.value.confirm_password) {
      this.toast.error("Password does not match");
      return;
    }
    const acc = {
      school_id: this.secondFormGroup.value.school_id,
      role_roleID: this.secondFormGroup.value.role.roleID,
      departmentID: this.firstFormGroup.value.department.departmentID,
      first_name: this.firstFormGroup.value.first_name,
      last_name: this.firstFormGroup.value.last_name,
      email: this.firstFormGroup.value.email,
      password: this.secondFormGroup.value.password,
      approve: 0
    }
    this.con = acc;
    
    this.authService
      .signup(acc)
      .subscribe(
        (data) => {
          this.uploadFiles();
          this.toast.success('Registration Successful');
        }
    );
  }

  uploadFiles() {
    this.message = [];

    for (let i = 0; i < this.selectedFiles!.length; i++) {
      this.upload(this.selectedFiles![i]);
    }
  }

  school_id: any;
  upload(file: any) {
    this.formData.append('file', file);
    const school_id = this.secondFormGroup.value.school_id;
    this.school_id = school_id;
    this.formData.append('school_id', school_id);

    this.fileService.uploadProfile(this.formData).subscribe();
  }
  nav(dest: string) {
    this.router.navigate([dest]);
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();
      this.img = this.selectedFiles[0];
      this.firstFormGroup.patchValue({
        image: this.img
      })
      this.firstFormGroup.get('image')?.updateValueAndValidity();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
        this.validImage = true;
      };

      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames.push(this.selectedFiles[0].name);
      this.url = this.selectedFiles[0].name;
    }
  }
}
