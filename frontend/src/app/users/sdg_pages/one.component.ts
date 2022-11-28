import { ResearchService } from 'src/app/authentication/services/research.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Account } from 'src/app/authentication/model/account';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { ReadMoreComponent } from '../read-more/read-more.component';

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
    private authService: AuthService,
    private accService: AccountService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.getInfoUsingSchoolId(this.school_id)
    console.log('this,auth', this.authService.isUserAuthenticated);
    console.log(this.data.background, 'data');
    this.url = "'../../../../../assets/" + this.data.background + "'";
    console.log(this.url)
    // set background image to id = backs
    document.getElementById("backs")!.style.backgroundImage = "url(" + this.url + ")";
    console.log(this.research$, 'research$');
    this.research_data = this.data.curr;
    // this.showEditButton();
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

  filterByTabs(tab: any) {
    // filter data.curr using tab
    // filter using tab
    let ret: any;
    if (tab == 'All') {
      this.research_data = this.data.curr;
      console.log(this.research_data, 'research_data');
    }
    if (tab == "Department's Research") {
      // get account
      console.log(this.account$.department);
      ret = this.data.curr.filter((item: any) => item.department == this.account$.department);
      console.log(ret, 'ret');
      this.research_data = ret;
    }
    if (tab == "Teacher's Research") {
      console.log(this.account$.department);
      ret = this.data.curr.filter((item: any) => item.role == "Teacher");
      this.research_data = ret;
      console.log(this.research_data, 'research_data');
    }
    if (tab == "Student's Research") {
      console.log(this.account$.department);
      ret = this.data.curr.filter((item: any) => item.role == "Student");
      this.research_data = ret;
    }
    /* 
      TODO: filter data.curr using tab
      1. get the current account or current user
      2. cross reference all retrieve research and check the account info about:
          a. what department
          b. role
      3. when clicking tabs it will corresponds to what tab is clicked and display
      what is needed to be displayed
          a. all - no filter
          b. department - filter by department with research and account table
          c. teacher - filter by role with research and account table
          d. student - filter by role with research and account table
    */

  }
  onTabClick(event: { tab: { textLabel: any; }; }) {
    console.log(event);
    console.log(event.tab.textLabel);
    this.filterByTabs(event.tab.textLabel);
  }

  ownership: any;

  // show edit button when the user is the owner of the research
  showEditButton(res: any): void {
    // check if the research id is the same as the current user id
    if (res.school_id == this.authService.school_id) {
      this.ownership = true;
    }
    else {
      this.ownership = false;
    }
    return this.ownership;
  }

  // show delete button when the user is the owner of the research
  showDeleteButton(res: any): void {
    // check if the research id is the same as the current user id
    if (res.school_id == this.authService.school_id) {
      this.ownership = true;
    }
    else {
      this.ownership = false;
    }
    return this.ownership;
  }

  updateRes(res: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      res
    };
    console.log(dialogConfig.data, 'dialogConfig.data');
    
    // this.dialog.open(dialogReference);
    const dialogRef = this.dialog.open(UpdateDialogComponent, dialogConfig);
    console.log(UpdateDialogComponent)
    //   const dialogRef = this.dialog.open(dialogReference);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readMore(res: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      res
    };
    console.log(dialogConfig.data, 'dialogConfig.data');
    
    // this.dialog.open(dialogReference);
    const dialogRef = this.dialog.open(ReadMoreComponent, dialogConfig);
    console.log(ReadMoreComponent)
    //   const dialogRef = this.dialog.open(dialogReference);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
