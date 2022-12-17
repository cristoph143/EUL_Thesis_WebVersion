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
import { FormControl } from '@angular/forms';
import Fuse from 'fuse.js';

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
    public researchService: ResearchService,
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
    console.log(this.data.account);
    this.school_id = this.data.account.school_id;
    console.log(this.data.background, 'data');
    this.url = "'../../../../../assets/" + this.data.background + "'";
    console.log(this.url)
    // set background image to id = backs
    document.getElementById("backs")!.style.backgroundImage = "url(" + this.url + ")";
    console.log(this.research$, 'research$');
    this.research_data = this.data.curr;
    console.log(this.research_data);
    console.log(this.data.all_research, 'all_research');
    this.research_all$ = this.data.all_research;
    console.log(this.research_all$, 'research_data');
  }
  url: any;
  research_all$: any;

  tabs: Tabs[] = [
    { label: 'All' },
    { label: 'Department\'s Research' },
    { label: 'Teacher\'s Research' },
    { label: 'Student\'s Research' },
  ];


  userId: Pick<Account, "school_id"> | undefined;
  school_id = this.data.account.school_id;

  filterByTabs(tab: any) {
    // filter data.curr using tab
    // filter using tab
    let ret: any;
    console.log(this.search + " --- " + this.search.length)
    if (tab == 'All') {
      this.research_data = this.data.curr;
      console.log(this.data.curr)
      console.log(ret + "ret");
      this.research_data = this.data.curr;
      console.log(this.research_data, 'research_data');
      if (this.search.length != 0) {
        console.log(this.search + " !und")
        this.filterSearch(tab);
      }
      else{
        console.log(this.search + " und")
        this.research_data = this.data.curr;
      }
    }
    const department = this.data.account.departmentName;
    console.log(department + "dep")
    if (tab == "Department's Research") {
      // get account
      console.log(this.data.curr.departmentName)
      // console.log(this.account$.department);
      console.log(ret + "ret");
      // check if department is equal to this.data.curr.DepartmentName
      ret = this.data.curr.filter((item: any) => item.DepartmentName == department);
      console.log(ret, 'ret');
      this.research_data = ret;
      if (this.search.length != 0) {
        console.log(this.search + " !und")
        this.filterSearch(tab);
      }
      else {
        this.research_data = ret;
      }
    }
    if (tab == "Teacher's Research") {
      ret = this.data.curr.filter((item: any) => item.roleName == "Teacher");
      this.research_data = ret;
      if (this.search.length != 0) {
        this.filterSearch(tab);
      }
      else{
        this.research_data = ret;
      }
    }
    if (tab == "Student's Research") {
      console.log(this.data.curr)
      // console.log(this.account$.department);
      ret = this.data.curr.filter((item: any) => item.roleName == "Student");
      console.log(ret + "ret");
      this.research_data = ret;
      if (this.search.length != 0) {
        console.log(this.search + " !und")
        this.filterSearch(tab);
      }
      else{
        this.research_data = ret;
      }
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

  // filter this.research_data by the keywords
  filterSearch(tab: any) {
    console.log("It works at " + tab + " : '" + this.search + "' " + this.research_data);
    // covert object to list of json
    let list: any = [];
    for (let i = 0; i < this.research_data.length; i++) {
      list.push(this.research_data[i]);
    }
    console.log(list);
    // filter list by normal method of search
    let ret: any = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].title.toLowerCase().includes(this.search.toLowerCase())) {
        ret.push(list[i]);
      }
    }
    console.log(ret);
    this.research_data = ret;
  } //ret receive from input search

  onTabClick(event: { tab: { textLabel: any; }; }) {
    console.log(event);
    console.log(event.tab.textLabel);
    // this.filterByTabs(event.tab.textLabel);
    this.current_tab = event.tab.textLabel;
    this.filterByTabs(this.current_tab)
  }

  ownership: any;

  // show delete button when the user is the owner of the research
  showDeleteButton(res: any): void {
    // check if the research id is the same as the current user id
    if (res.school_id == this.school_id) {
      this.ownership = true;
    }
    else {
      this.ownership = false;
    }
    return this.ownership;
  }

  deleteRes(res: any) {
    console.log(res);
    /*FIXME - 
      When user wants to delete the research using wrong password,
      it creates an error in the console.
    */
    // confirm if the user wants to delete the research
    if (confirm("Are you sure you want to delete this research?")) {
      // ask user for input password
      let password = prompt("Please enter your password to confirm");
      // check if the password is correct
      this.accService.confirmPasswordUsingId(this.school_id, password).subscribe((data: any) => {
        console.log(data.message);
        // if data.message is equal to "Password is correct"
        if (data.message == "Password is correct") {
          // delete the research
          this.researchService.deleteResearch(res.research_id).subscribe((data: any) => {
            console.log(data);
          });
          window.location.reload();
        }
        else {
          alert(data.message);
        }
      });
    }
  }

  readMore(res: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    let ownership = this.showDeleteButton(res);
    console.log(ownership, 'ownership');
    
    const all_res = this.research_all$;
    console.log(all_res, 'all_res');
    dialogConfig.data = {
      res, //current or specific research
      all_res,
      account: this.data.account,
      ownership: ownership
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

  search: string = "";
  current_tab = "All";

  onChange($event: any) {
    this.search = $event;
    console.log(this.search, 'search');
    // 
    console.log(this.current_tab);
    // iterate this.research_data and print the values inside the array
    this.research_data.forEach((item: any) => {
      console.log(item);
    });
    this.filterByTabs(this.current_tab);
  }
  
  
  
}
