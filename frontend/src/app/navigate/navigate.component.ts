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
export class NavigateComponent implements OnInit {

  isAuthenticated = false;
  // isLoggedIn$ = false;
  isLoggedIn$!: Observable<boolean>;
  search : String ="";

  constructor(
    private authService: AuthService,
    private router: Router,
    private accService: AccountService) { }

  ngOnInit(): void {
    console.log(this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      console.log('?????',this.isAuthenticated)
    }))
    // this.isAuthenticated = this.authService.isUserLoggedIn$;
    console.log('hello', this.isAuthenticated);
    console.log(this.account$.first_name, "?=?", this.account$.last_name);
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

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;
  account$: any;

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any){
    // return this.accService.fetchAccount(school_id);
    console.log(this.accService
      .fetchAccountUsingId(
        school_id
    )
      .subscribe((data:any) => {
        console.log(data[0][0]);
        this.account$ = data[0][0];
        
        return this.account$;
      }
    ));
  }


}
