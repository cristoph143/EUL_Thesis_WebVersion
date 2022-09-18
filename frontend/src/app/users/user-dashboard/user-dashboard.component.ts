import { Component, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accService: AccountService
  ) { }

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  ngOnInit(): void {
    // console.log('userlog==>',this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
    //   this.isAuthenticated = isLoggedIn;
    //   console.log(this.isAuthenticated.toString)
    // }))
    this.userId = this.authService.userId;
    console.log(this.userId);
    this.school_id = this.authService.school_id;
    this.getInfoUsingSchoolId(this.school_id);
    console.log('acc--;',(this.account$));
    this.authService.isUserAuthenticated;
    this.full_name$ = this.account$.first_name + ' ' + this.account$.last_name;
    console.log(this.full_name$);
  }

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

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
