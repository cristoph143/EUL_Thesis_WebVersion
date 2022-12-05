import { Component, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UploadResearchComponent } from '../upload-research/upload-research.component';
import { ResearchService } from 'src/app/authentication/services/research.service';
import { Router } from '@angular/router';
import { OneComponent } from '../sdg_pages/one.component';
import sdg from '../homepage/sdg';


export interface Tile {
  src: string;
  cols: number;
  rows: number;
  redirect: any;
  disabled: boolean;
  title: String;
  sub_title: String;
  background: String;
  // text: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private accService: AccountService,
    private researchService: ResearchService,
    public dialog: MatDialog
  ) { }

  tiles: Tile[] = [];
  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  research$: any;


  ngOnInit(): void {
    this.fetchAllResearch();
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
    // iterate values of sdg and saved it iterately in Tiles
    for(let i = 0; i < sdg.length; i++){
      this.tiles.push({"cols": 1, "rows": 1, "src": sdg[i].src, "redirect": OneComponent, "disabled":false, "title": sdg[i].title, "sub_title": sdg[i].sub_title, "background": sdg[i].background});
    }
  }



  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

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
    let res: never[] = [];
    this.researchService.fetchAllResearch().subscribe((data: any) => {
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

  // OpenDialog() {
  //   this.dialog.open(UploadResearchComponent);
  // }

  nav(dest: any) {
    alert(dest)
    this.router.navigate([dest]);
  }

  curr: any;
  

  openDialog(dialogReference: any, src: any, title: any, sub_title: any, background: any) {
    console.log(this.research$)
    console.log(this.account$, 'account$');
    // filter research$ by sdg_category
    this.curr = this.research$.filter((item: any) => //string exist in sdg_category
      item.sdg_category.includes(title)
    );
    // removes duplicate research_id in this.curr and remain one copy of each research_id
    this.curr = this.curr.filter((item: any, index: any) =>
      this.curr.findIndex((item2: any) => item2.research_id === item.research_id) === index
    );
    this.research$ = this.research$.filter((item: any, index: any) => 
      this.research$.findIndex((item2: any) => item2.research_id === item.research_id) === index
    );
    console.log(this.curr, 'curr')
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      src,
      title,
      sub_title,
      background,
      curr: this.curr,
      account: this.account$,
      all_research: this.research$
    };
    console.log(dialogConfig.data, 'dialogConfig.data');

    // this.dialog.open(dialogReference);
    const dialogRef = this.dialog.open(dialogReference, dialogConfig);
    console.log(dialogReference)
    //   const dialogRef = this.dialog.open(dialogReference);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });


    
  }
}
