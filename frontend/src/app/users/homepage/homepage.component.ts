import { Component, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
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
    const token_arr = JSON.parse(token!);
    const type = 
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.getInfoUsingSchoolId(type);
    for(let i = 0; i < sdg.length; i++){
      this.tiles.push({
        "cols": 1,
        "rows": 1,
        "src": sdg[i].src,
        "redirect": OneComponent,
        "disabled": sdg[i].disabled,
        "title": sdg[i].title,
        "sub_title": sdg[i].sub_title,
        "background": sdg[i].background
      });
    }
  }



  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

  // http request for getting the user details using school_id
  getInfoUsingSchoolId(school_id: any) {
    let res: never[] = [];
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

  curr: any;
  openDialog(dialogReference: any, src: any, title: any, sub_title: any, background: any) {
    // filter research$ by sdg_category
    this.curr = this.research$.filter((item: any) => //string exist in sdg_category
      item.sdg_category.includes(title)
    );
    let remove_dup: any;
    // removes duplicate research_id in this.curr and remain one copy of each research_id based on the sdg
    this.curr = this.curr.filter((item: any, index: any) =>
      this.curr.findIndex((item2: any) => item2.research_id === item.research_id) === index
    );
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
    dialogConfig.data = {
      src,
      title,
      sub_title,
      background,
      curr: this.curr,
      account: this.account$,
      all_research: this.research$
    };

    const dialogRef = this.dialog.open(dialogReference, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }
}
