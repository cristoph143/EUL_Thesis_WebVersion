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
    console.log(this.research_data);
    console.log(this.data.all_research, 'all_research');
    this.research_all$ = this.data.all_research;
    console.log(this.research_all$, 'research_data');
    // this.showEditButton();
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
    if (tab == "Department's Research") {
      // get account
      console.log(this.data.curr)
      console.log(this.account$.department);
      console.log(ret + "ret");
      ret = this.data.curr.filter((item: any) => item.department == this.account$.department);
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
      console.log(this.data.curr)
      console.log(this.account$.department);
      ret = this.data.curr.filter((item: any) => item.role == "Teacher");
      console.log(ret + "ret");
      this.research_data = ret;
      console.log(this.research_data, 'research_data');
      if (this.search.length != 0) {
        console.log(this.search + " !und")
        this.filterSearch(tab);
      }
      else{
        this.research_data = ret;
      }
    }
    if (tab == "Student's Research") {
      console.log(this.data.curr)
      console.log(this.account$.department);
      ret = this.data.curr.filter((item: any) => item.role == "Student");
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
    // filter list using fuzzy search
    let options = {
      shouldSort: true,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      sortFn: function (a: any, b: any) {
        return a.score - b.score;
      },
      // includeMatches: true,
      findAllMatches: true,
      includeScore: true,
      isCaseSensitive: false,
      keys: ["title"]
    };
    let result_list = [];
    console.log(this.search + " s")
    let fuse = new Fuse(list, options);
    let result = fuse.search(this.search);
    console.log(typeof result + " " + result) 
    // iterate the object result
    for (let i = 0; i < result.length; i++) {
      console.log(result[i])
      console.log(result[i].item)
      result_list.push(result[i].item);
    }
    console.log(result_list);
    this.research_data = result_list;
    
    
    /*TODO - filter by keywords
      1. Use the input from ret
      2. filter by title
      Future: filter by other fields if it will work
    */
    
  } //ret receive from input search

  onTabClick(event: { tab: { textLabel: any; }; }) {
    console.log(event);
    console.log(event.tab.textLabel);
    // this.filterByTabs(event.tab.textLabel);
    this.current_tab = event.tab.textLabel;
    this.filterByTabs(this.current_tab)
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

  deleteRes(res: any) {
    console.log(res);
    this.researchService.deleteResearch(res.research_id).subscribe((data: any) => {
      console.log(data);
    });
    // window.location.reload();
  }

  updateRes(res: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      res,
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
    // add 1 to res.number_of_views
    let number: number = res.number_of_views + 1;
    this.researchService.addNumberOfViews(res.research_id, number).subscribe((res: any) => {
      console.log(res);
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    
    const all_res = this.research_all$;
    console.log(all_res, 'all_res');
    dialogConfig.data = {
      res,
      all_res,
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

  // formcontrol for search
  searchForm = new FormControl('');

  // search() {
  //   // get the id from the search bar
  //   let id = this.searchForm.value;
  //   console.log(id, 'id');
  // }

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
