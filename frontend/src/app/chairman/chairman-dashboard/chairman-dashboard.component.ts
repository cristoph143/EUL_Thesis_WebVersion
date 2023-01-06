import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from 'src/app/authentication/model/account';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FileService } from 'src/app/authentication/services/file.service';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';

@Component({
  selector: 'app-chairman-dashboard',
  templateUrl: './chairman-dashboard.component.html',
  styleUrls: ['./chairman-dashboard.component.css']
})
export class ChairmanDashboardComponent implements OnInit {

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
  ngOnInit(): void {
    this.school_id = this.authService.school_id;
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type = 
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.getInfoUsingSchoolId(type);
    this.getProfile(type);
  }

  img: any;

  getProfile(school_id: any) {
    this.fileService.getProfile(school_id).subscribe((data: any) => {
      this.img = data;
      this.blobToImage(data);
    });
  }
  panelOpenState = false;


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

  cur_tab: any;
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
