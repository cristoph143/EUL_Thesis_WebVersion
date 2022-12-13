import { Component, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { UploadResearchComponent } from '../upload-research/upload-research.component';
import { Router } from '@angular/router';

export interface Tabs {
  label: string;
  icon: string;
  dir: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private router: Router,
    // public dialog: MatDialog
  ) { }

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  tabs: Tabs[] = [
    { label: 'Home', icon: 'home', dir: 'app-homepage' },
    { label: 'Search', icon: 'search', dir: 'app-search' },
    { label: 'Upload', icon: 'cloud_upload', dir: 'app-upload-research' },
    { label: 'Library', icon: 'library_books', dir: 'app-research-library' },
    { label: 'Profile', icon: 'portrait', dir: 'app-profile' },
  ];

  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.school_id = this.authService.school_id;
    console.log(this.school_id)
    this.getInfoUsingSchoolId(this.school_id);
  }

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

  getInfoUsingSchoolId(school_id: any) {
    console.log(school_id, 'school_id');
    let res: never[] = [];
    // return this.accService.fetchAccount(school_id);
    this.accService
      .fetchAccountUsingId(
        school_id
    )
      .subscribe((data:any) => {
        console.log(data[0][0]);
        res = data[0][0];
        this.getAcc(res);
        return data[0][0];
      }
    );
  }

  getAcc(res:any) {
    console.log(res)
    const curr_acc = res;
    console.log(curr_acc, 'curr_acc');
    this.account$ = curr_acc;
    console.log(this.account$, 'account$');
  }
  onTabClick(event: { tab: { textLabel: any; }; }) {
    console.log(event);
    console.log(event.tab.textLabel);
    // check the event.tab.textLabel to tabs
    if (event.tab.textLabel === 'Upload') {
      console.log('upload');
    }
  }
}
