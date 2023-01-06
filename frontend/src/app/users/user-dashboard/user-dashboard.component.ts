import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/core/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';
import { FileService } from 'src/app/authentication/services/file.service';

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
    private fileService: FileService,
    media: MediaMatcher,
    private tokenStorage: TokenStorageService
  ) {
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
    { label: 'Logout', icon: 'logout', dir: 'app-logout'}
  ];

  ngOnInit(): void {
    this.school_id = this.authService.school_id;
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type = 
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.getInfoUsingSchoolId(type);
    this.onTabClick(this.tabs[0]);
    this.getProfile(type);
  }

  img: any;

  getProfile(school_id: any) {
    this.fileService.getProfile(school_id).subscribe((data: any) => {
      this.img = data;
      this.blobToImage(data);
    });
  }


  imageToShow: any;

  // convert blob to image
  blobToImage(blob: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
    }, false);
    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  setProfile(profile: any) {
    this.cur_tab = profile;
  }

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

  getInfoUsingSchoolId(school_id: any) {
    let res: never[] = [];
    this.accService
      .fetchAccountUsingId(
        school_id
    )
      .subscribe((data:any) => {
        res = data[0][0];
        this.getAcc(res);
        return data[0][0];
      }
    );
  }

  getAcc(res:any) {
    const curr_acc = res;
    this.account$ = curr_acc;
  }

  cur_tab: any;
  onTabClick(event: any) {
    // check the event.tab.textLabel to tabs
    if (event.label !== 'Logout') {
      this.cur_tab = event.label;
    }
    if (event.label === 'Logout') {
      this.logout();
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    const remove: any = this.tokenStorage.getTokens();
    this.isAuthenticated = remove;
    this.router.navigate(["login"]);
  }

  nav(dest: string) {
    this.router.navigate([dest]);
  }
}
