import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { AuthService } from '../services/auth.service';
// import { AccountCrudService } from '../services/account-crud.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account$ = Observable<Account[]>;

  constructor(
    private authService: AuthService,
    // private AccountCrudService: AccountCrudService,
    private router: Router,
    private toast: HotToastService,) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    idLogin: new FormControl('', Validators.required),
    passLogin: new FormControl('', Validators.required)
  });
  registerForm: FormGroup = new FormGroup({
    school_idRegister: new FormControl('', Validators.required),
    first_nameRegister: new FormControl('', Validators.required),
    last_nameRegister: new FormControl('', Validators.required),
    emailRegister: new FormControl('', Validators.required),
    departmentRegister: new FormControl('', Validators.required),
    imageRegister: new FormControl('', Validators.required),
    passwordRegister: new FormControl('', Validators.required),
  });
 
  onSubmitLogin(){
    if (!this.loginForm.valid) {
      this.toast.error("Invalid Login");
      return;
    }
    const cred = {
      school_id: this.loginForm.value.idLogin,
      password: this.loginForm.value.passLogin
    }

    this.authService
      .login(
        cred.school_id,
        cred.password
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


  onSubmitRegister(){
    console.log(this.registerForm.value)
    if(!this.registerForm.valid){
      this.toast.error("Invalid Registration");
      return;
    }

    const acc = {
      school_id: this.registerForm.value.school_idRegister,
      first_name: this.registerForm.value.first_nameRegister,
      last_name: this.registerForm.value.last_nameRegister,
      email: this.registerForm.value.emailRegister,
      department: this.registerForm.value.departmentRegister,
      image: this.registerForm.value.imageRegister,
      password: this.registerForm.value.passwordRegister
    }
    
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

}
