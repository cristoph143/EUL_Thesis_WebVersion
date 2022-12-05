import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Account } from 'src/app/authentication/model/account';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';
import { OneComponent } from '../sdg_pages/one.component';
import { Tabs } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-research-library',
  templateUrl: './research-library.component.html',
  styleUrls: ['./research-library.component.css']
})
export class ResearchLibraryComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private researchService: ResearchService,
  ) { }

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  research$: any;
  src: any;

  research_data: any;

  ngOnInit(): void {
    this.school_id = this.authService.school_id;
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
    console.log('this,auth', this.authService.isUserAuthenticated);
    console.log(this.research$, 'research$');
    this.fetchAllResearch();
  }
  url: any;

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any){
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
  onTabClick(event: { tab: { textLabel: any; }; }) {
    console.log(event);
    console.log(event.tab.textLabel);
  }

  fetchAllResearch() {
    let res: never[] = [];
    this.researchService.fetchAllLibrary(this.school_id).subscribe((data: any) => {
      console.log(data[0]);
      console.log(data);
      res = data[0];
      this.getVal(res);
      return data[0];
    });
    console.log(res, 'res');
  }

  getVal(res:any){
    const research_list = res;
    this.research$ = research_list;
    console.log(this.research$, 'research$');
    // loop this.research$ and get the values
  }
}
