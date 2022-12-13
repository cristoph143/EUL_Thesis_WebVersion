import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../authentication/services/account.service';
import { AuthService } from '../authentication/services/auth.service';
import { Account } from '../authentication/model/account';
import { TokenStorageService } from '../authentication/services/token-storage.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  isAuthenticated = false;
  // isLoggedIn$ = false;
  isLoggedIn$!: Observable<boolean>;
  search: String = "";
  
  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;
  account$: any;
  full_name: any;


  constructor(
    private authService: AuthService,
    private router: Router,
    private accService: AccountService,
    private tokenStorage: TokenStorageService
  ) {}
  
  ngOnInit(): void {
    this.isAuthenticated = false;
    console.log(this.tokenStorage.getTokens() + "------------------------------------------")
    const islogin = this.tokenStorage.getTokens();
    if (islogin) {
      console.log(localStorage.getItem('token') + "------------------------------------------");
      localStorage.setItem('token', sessionStorage.getItem('token')!);
      this.isAuthenticated = islogin;
      const token = localStorage.getItem('token');
      console.log(token, 'token');
      console.log(typeof token)
      // convert string to [{}]
      const token_arr = JSON.parse(token!);
      console.log(token_arr, 'token_arr');
      console.log(token_arr, 'token_arr');
      const type = 
      // if token_arr has key of "userId" then use it otherwise use "school_id"
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
      // this.school_id = 

      console.log(type)
      const a = this.getInfoUsingSchoolId(type);
      console.log("a + " + a);
      console.log('this,auth', this.authService.isUserAuthenticated);
      // this.roles = this.tokenStorage.getUser().roles;
    }
    this.isAuthenticated = islogin;
    console.log('this,isAuthenticated', this.isAuthenticated);
  }
  
  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any) {
    console.log(school_id, 'school_id');
    let res: never[] = [];
    console.log(this.accService
      .fetchAccountUsingId(
        school_id
    )
      .subscribe((data:any) => {
        console.log(data[0][0]);
        res = data[0][0];
        this.full_name = data[0][0].first_name + " " + data[0][0].last_name;
        this.getAcc(res);
        return data[0][0];
      }
    ));
  }

  getAcc(res:any) {
    console.log(res)
    const curr_acc = res;
    this.account$ = curr_acc;
    console.log(this.account$.first_name, 'account$');
  }


  logout(): void {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // const remove = this.authService.isUserLoggedIn$.next(false);
    const remove: any = this.tokenStorage.getTokens();
    // this.authService.isUserLoggedIn$ = false;
    this.isAuthenticated = remove;
    console.log(this.isAuthenticated + " is authenticated")
    this.router.navigate(["login"]);
  }

  nav(dest: string) {
    this.router.navigate([dest]);
  }
}
