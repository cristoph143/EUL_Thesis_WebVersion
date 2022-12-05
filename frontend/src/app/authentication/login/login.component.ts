import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MaxLengthValidator, MinLengthValidator } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Account } from '../model/account';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
// import { AccountCrudService } from '../services/account-crud.service';
// import { LibraryConfig } from '../../authentication/model/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
    // private AccountCrudService: AccountCrudService,
    private router: Router,
    private toast: HotToastService,
    private tokenStorage: TokenStorageService
  ) { }

  data: any;
  isLoggedIn = false;

  ngOnInit(): void {
    this.rememberMe = false;
    console.log(this.tokenStorage.getTokens() + "------------------------------------------")
    if (this.tokenStorage.getTokens()) {
      console.log(
        (this.tokenStorage.saveToken(sessionStorage.getItem('token')!))
      );
      localStorage.setItem('token', sessionStorage.getItem('token')!);
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
    // this.AutoLogin();
  }

  account$ = Observable<Account[]>;

  error: String = "";
  rememberMe: boolean = false;
  
  loginForm: FormGroup = new FormGroup({
    school_id: new FormControl(
      '',
      Validators.required,
    ),
    password: new FormControl(
      '',
      Validators.required
    )
  })

  hide = true;

//   AutoLogin(){
//     const accessTokenObj = localStorage.getItem("token");
//     // Retrieve rememberMe value from local storage
//     const rememberMe = localStorage.getItem('rememberMe');
// console.log(accessTokenObj);
//     if (accessTokenObj && rememberMe == 'yes') {
//       this.router.navigate(['/home']);
//     } else {
//       console.log("You need to login")
//     }
//   }
  
  // loginForm: FormGroup = new FormGroup({
  //   school_id: new FormControl(
  //     '',
  //     Validators.required,
  //   ),
  //   password: new FormControl(
  //     '',
  //     Validators.required
  //   )
  // })

  

  onSubmitLogin(){
    if (this.loginForm.invalid) {
      this.toast.error('Please fill in all fields');
      this.loginForm.markAllAsTouched();
      return;
    }
    
    console.log(this.authService
      .login(
        this.loginForm.value.school_id,
        this.loginForm.value.password,
      )
      .pipe(
        // toaster 
        this.toast.observe({
          success: 'Successfully logged in',
          loading: 'loading',
          error: (msg: any) => {
            console.log(msg)
            alert(msg)
            return msg;
          }
        })
      )
      .subscribe(data => {
        console.log('Data', data);
        this.data = data;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        // this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // this.router.navigate(['/home']);
      }
      )
    );
    console.log(this.authService.currUser)
    console.log(this.authService.isUserAuthenticated)
  }

  reloadPage(): void {
    window.location.reload();
  }
  getErrorMessage() {
    if (this.loginForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.hasError('school_id') ? 'Not a school_id' : '';
  }

  nav(dest: string) {
    this.router.navigate([dest]);
  }
  
  private formSubmitAttempt: boolean = false;

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
}
