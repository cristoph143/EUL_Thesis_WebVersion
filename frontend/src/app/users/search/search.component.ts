import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';
import { ReadMoreComponent } from '../read-more/read-more.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type = 
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
      this.school_id = type;
      this.getInfoUsingSchoolId(type);
    this.fetchAllResearch();
  }

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any) {
    let res: never[] = [];
    // return this.accService.fetchAccount(school_id);
    this.accService.fetchAccountUsingId(school_id)
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

  authors: any;
  fetchAllResearch() {
    let res: never[] = [];
    this.researchService.fetchAllResearch().subscribe((data: any) => {
      res = data[0];
      this.getVal(res);
      return data[0];
    });
  }

  getVal(res:any){
    const research_list = res;
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
    this.filter = filter;
  }

  orig_res: any;

  // filter this.research_data by the keywords
  filterSearch(txt: any) {
    // if this.orig is empty, then assign this.research_data to this.orig
    if (this.orig_res == undefined) {
      this.orig_res = this.research$;
    }
    this.research$ = this.orig_res;

    const list = []
    // iterate this.research_data
    for (let i = 0; i < this.research$.length; i++) {
      // save research$ to list
      list.push(this.research$[i]);
    }
        // filter list by normal method of search
    this.research$ = list.filter((res: any) => {
      // if the filter is title
      if (this.filter == "title") {
        // if the title contains the search keyword
        if (res.title.toLowerCase().includes(txt.toLowerCase())) {
          // return the research
          return res;
        }
      }
      // if the filter is author
      else if (this.filter == "author") {
        // if the author contains the search keyword
        if (res.author.toLowerCase().includes(txt.toLowerCase())) {
          // return the research
          return res;
        }
      }
      // if the filter is year published
      else if (this.filter == "year published") {
        // if the year published contains the search keyword
        if (res.year_published.toLowerCase().includes(txt.toLowerCase())) {
          // return the research
          return res;
        }
      }
      // if the filter is adviser
      else if (this.filter == "adviser") {
        // if the adviser contains the search keyword
        if (res.adviser.toLowerCase().includes(txt.toLowerCase())) {
          // return the research
          return res;
        }
      }
    });

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
        // if data.message is equal to "Password is correct"
        if (data.message == "Password is correct") {
          // delete the research
          this.researchService.deleteResearch(res.research_id).subscribe();
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
      position: {
        left: '1px'
      },
      height: '100%',
      width: '100vw',
      maxWidth: '100vw',
      panelClass: 'full-screen-modal'
    }
    let ownership = this.showDeleteButton(res);
    
    const all_res = this.research$;
    dialogConfig.data = {
      res, //current or specific research
      all_res,
      account: this.account$,
      ownership: ownership
    };
    
    const dialogRef = this.dialog.open(ReadMoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  onChange($event: any) {
    this.search = $event;
    this.filterSearch($event);
  }
}
