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
    console.log(this.tokenStorage.getTokens() + "------------------------------------------")
    const islogin = this.tokenStorage.getTokens();
    if (islogin) {
      console.log(localStorage.getItem('token') + "------------------------------------------");
      localStorage.setItem('token', sessionStorage.getItem('token')!);
      this.isAuthenticated = islogin;
      this.isLoggedIn$ = islogin;
      this.tokenStorage.getUser();
      const token = localStorage.getItem('token');
      console.log(token, 'token');
      // extract school_id from token
      const school_id = token?.split(',')[1];
      console.log(school_id, 'school_id');
      // split school_id to get the school_id
      const school_id2 = school_id?.split(':')[1];
      console.log(school_id2, 'school_id2');
      // remove special characters
      const school_id3 = school_id2?.replace(/['"}]+/g, '');
      console.log(school_id3, 'school_id3');
      // this.school_id = 
      this.getInfoUsingSchoolId(school_id3);
    
      // this.roles = this.tokenStorage.getUser().roles;
    }
  }

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any) {
    console.log(school_id, 'school_id');
    let res: never[] = [];
    // return this.accService.fetchAccount(school_id);
    console.log(this.accService
      .fetchAccountUsingId(
        school_id
    )
      .subscribe((data:any) => {
        console.log(data[0][0]);
        res = data[0][0];
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
    const remove: any = this.authService.isUserLoggedIn$.next(false);
    // this.authService.isUserLoggedIn$ = false;
    this.isAuthenticated = remove;
    this.router.navigate(["login"]);
  }

  nav(dest: string) {
    this.router.navigate([dest]);
  }

  // getInfoUsingSchoolId(school_id: any) {
  //   console.log(school_id, 'school_id');
  //   let res: never[] = [];
  //   // return this.accService.fetchAccount(school_id);
  //   console.log(this.accService
  //     .fetchAccountUsingId(
  //       school_id
  //   )
  //     .subscribe((data:any) => {
  //       console.log(data[0][0]);
  //       res = data[0][0];
  //       this.getAcc(res);
  //       return data[0][0];
  //     }
  //   ));
  // }

  // getAcc(res:any) {
  //   console.log(res)
  //   const curr_acc = res;
  //   console.log(curr_acc, 'curr_acc');
  //   this.account$ = curr_acc;
  //   console.log(this.account$, 'account$');
  //   this.full_name = this.account$.first_name + " " + this.account$.last_name;
  //   console.log(this.full_name, 'full_name');
  // }

 
}
