import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from 'src/app/authentication/model/account';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { OneComponent } from '../sdg_pages/one.component';
import { Tabs } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-research-library',
  templateUrl: './research-library.component.html',
  styleUrls: ['./research-library.component.css']
})
export class ResearchLibraryComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private accService: AccountService,
    private researchService: ResearchService,
    public dialog: MatDialog
  ) { }

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  research$: any;
  school_id: any;

  ngOnInit(): void {
    console.log("hello")
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type = 
    token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.school_id = type;
    this.getInfoUsingSchoolId(type);
    console.log(type)
    console.log('this,auth', this.authService.isUserAuthenticated);
    this.fetchAllResearch();
  }

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any) {
    console.log(school_id, 'school_id');
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

  authors: any;
  fetchAllResearch() {
    console.log("Getting")
    let res: never[] = [];
    this.researchService.fetchAllLibrary(this.school_id).subscribe((data: any) => {
      console.log(data[0]);
      console.log(data);
      res = data[0];
      this.getVal(res);
      return data[0];
    });
  }
  
  getVal(res:any){
    let research_list = [];
    // remove duplicate research using research_id in res
    for (let research of res) {
      let isUnique = true;
      for (let i = 0; i < research_list.length; i++) {
        if (research_list[i].research_id == research.research_id) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        research_list.push(research);
      }
    }
    this.research$ = research_list;
  }

  nav(dest: any) {
    alert(dest)
    this.router.navigate([dest]);
  }

  showList = true;
  
  filters = ["title", "author", "year published", "adviser"];
  filter: any = "title";
  filterBy(filter: any) {
    console.log(filter);
    this.filter = filter;
  }

  // filter this.research_data by the keywords
  filterSearch() {
    console.log(this.search + "d")
    // covert object to list of json
    let list: any = [];
    for (let i = 0; i < this.research$.length; i++) {
      console.log(this.research$[i])
      list.push(this.research$[i]);
    }
    console.log(list);
    console.log("filter", this.filter)
    // filter list by normal method of search
    let ret: any = [];
    for (let i = 0; i < list.length; i++) {
      // if filter is equal to title
      if (this.filter == "title") {
        if (list[i].title.toLowerCase().includes(this.search.toLowerCase())) {
          ret.push(list[i]);
        }
      }
      // if filter is equal to author
      else if (this.filter == "author") {
        // either search in first name or last name
        if (list[i].firstName.toLowerCase().includes(this.search.toLowerCase()) || list[i].lastName.toLowerCase().includes(this.search.toLowerCase())) {
          ret.push(list[i]);
        }
        // combine first name and last name
        else if ((list[i].firstName + " " + list[i].lastName).toLowerCase().includes(this.search.toLowerCase())) {
          ret.push(list[i]);
        }
      }
      // if filter is equal to date_published
      else if (this.filter == "year published") {
        // extract year from date_published
        let year = list[i].date_published.split("-")[0];
        console.log(year)
        if (year.toLowerCase().includes(this.search.toLowerCase())) {
          ret.push(list[i]);
        }
      }
      // if filter is equal to adviser
      else if (this.filter == "adviser") {
        if (list[i].adviser.toLowerCase().includes(this.search.toLowerCase())) {
          ret.push(list[i]);
        }
      }
    }
    console.log(ret);
    this.research$ = ret;
  } //ret receive from input search
  
  search: string = "";

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
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose: true,
      autoFocus: true,
      // width: '100%',
      // height: '100%',
      position: {
        left: '1px'
      },
      height: '100%',
      width: '100vw',
      maxWidth: '100vw',
      panelClass: 'full-screen-modal'
      // panelClass: ['full-screen-modal']
    }
    let ownership = this.showDeleteButton(res);
    console.log(ownership, 'ownership');
    
    const all_res = this.research$;
    console.log(all_res, 'all_res');
    dialogConfig.data = {
      res, //current or specific research
      all_res,
      account: this.account$,
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

  onChange($event: any) {
    this.search = $event;
    console.log(this.search, 'search');
    this.filterSearch();
  }
}
