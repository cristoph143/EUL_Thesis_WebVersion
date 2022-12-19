import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { UploadResearchComponent } from '../upload-research/upload-research.component';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

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
export class UserDashboardComponent implements OnInit, OnDestroy {

  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  mobileQuery: MediaQueryList;

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  tabs: Tabs[] = [
    { label: 'Home', icon: 'home', dir: 'app-homepage' },
    { label: 'Search', icon: 'search', dir: 'app-search' },
    { label: 'Upload', icon: 'cloud_upload', dir: 'app-upload-research' },
    { label: 'Library', icon: 'books', dir: 'app-research-library' },
    { label: 'My Research', icon: 'library_books', dir: 'app-my-research' },
    { label: 'Profile', icon: 'portrait', dir: 'app-profile' },
    { label: 'Logout', icon: 'logout', dir: 'app-logout'}
  ];

  ngOnInit(): void {
    // this.userId = this.authService.userId;
    this.school_id = this.authService.school_id;
    console.log(this.school_id)
    this.getInfoUsingSchoolId(this.school_id);
    this.onTabClick(this.tabs[0]);
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

  cur_tab: any;
  onTabClick(event: any) {
    console.log(event);
    console.log(event);
    // check the event.tab.textLabel to tabs
    if (event.label !== 'Logout' || event.label !== 'My Research') {
      console.log('upload');
      this.cur_tab = event.label;
    }
  }
}
