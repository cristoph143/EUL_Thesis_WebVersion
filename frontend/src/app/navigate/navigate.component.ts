import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../authentication/services/account.service';
import { AuthService } from '../authentication/services/auth.service';
import { Account } from '../authentication/model/account';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit{

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
  ) { }
  
  ngOnInit(): void {
    console.log(this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      console.log('?????',this.isAuthenticated)
    }))
    // this.isAuthenticated = this.authService.isUserLoggedIn$;
    console.log('hello', this.isAuthenticated);
    
    // this.school_id = this.authService.school_id;
    // console.log('school_id', this.school_id)
    // this.getInfoUsingSchoolId(this.school_id);
  }

  logout(): void {
    localStorage.removeItem("token");
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
