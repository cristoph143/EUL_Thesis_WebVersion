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
    if (this.tokenStorage.getTokens()) {
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
      .subscribe(data => {
        console.log('Data', data);
        if (data == undefined) {
          this.nav('approve')
          // toast error message
          this.toast.error('Please wait for approval');
        }
        this.data = data;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        // toast success message
        this.toast.success('Login successful');
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
