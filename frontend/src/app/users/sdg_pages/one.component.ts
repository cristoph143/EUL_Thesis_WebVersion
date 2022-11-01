import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Account } from 'src/app/authentication/model/account';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Tile {
  cols: number;
  rows: number;
  redirect: any;
  title: string;
  abstract: string;
  text: string;
}

export interface Tabs {
  label: string;
}
@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {


  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private router: Router,
    private authService: AuthService,
    private accService: AccountService,
    private researchService: ResearchService,
    public dialogRef: MatDialogRef<OneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  research$: any;
  src: any;

  ngOnInit(): void {
    this.fetchAllResearch();
    this.school_id = this.authService.school_id;
    this.getInfoUsingSchoolId(this.school_id)
    console.log('this,auth', this.authService.isUserAuthenticated);
    console.log(this.data.background, 'data');
    this.url = "'../../../../../assets/" + this.data.background + "'";
    console.log(this.url)
    // set background image to id = backs
    document.getElementById("backs")!.style.backgroundImage = "url(" + this.url + ")";
    console.log(this.research$, 'research$');
  }
  url: any;

  tabs: Tabs[] = [
    { label: 'All' },
    { label: 'Department\'s Research' },
    { label: 'Teacher\'s Research' },
    { label: 'Student\'s Research' },
  ];


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

  
  fetchAllResearch() {
    let res: never[] = [];
    this.researchService.fetchAllResearch().subscribe((data: any) => {
      console.log(data[0]);
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
    console.log(this.research$[0], 'research$');

    // loop this.research$ and get the values
  }

  // tiles: Tile[] = [
  //   {cols: 1, rows: 1, src: , redirect:},

}
