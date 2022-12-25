import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MaxLengthValidator, MinLengthValidator } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Account } from '../model/account';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
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
    }
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

  onSubmitLogin(){
    if (this.loginForm.invalid) {
      this.toast.error('Please fill in all fields');
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.authService
      .login(
        this.loginForm.value.school_id,
        this.loginForm.value.password,
      )
      .subscribe(data => {
        if (data == undefined) {
          this.nav('approve')
          this.toast.error('Please wait for approval');
        }
        this.data = data;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.toast.success('Login successful');
      });
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
