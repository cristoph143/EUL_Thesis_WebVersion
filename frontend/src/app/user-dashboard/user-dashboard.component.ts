import { Component, OnInit } from '@angular/core';
import { Account } from '../authentication/model/account';
import { AuthService } from '../authentication/services/auth.service';
import { AccountService } from '../authentication/services/account.service';
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

  ngOnInit(): void {
    this.userId = this.authService.userId;
    console.log(this.userId);
    this.school_id = this.authService.school_id;
    this.account$ = this.getInfoUsingSchoolId(this.school_id);
  }

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any): Observable<Account> {
    return this.accService.fetchAccount(school_id);
  }
}
