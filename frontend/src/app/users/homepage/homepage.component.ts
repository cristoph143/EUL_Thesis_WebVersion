import { Component, OnInit } from '@angular/core';
import { Account } from '../../authentication/model/account';
import { AuthService } from '../../../app/authentication/services/auth.service';
import { AccountService } from '../../../app/authentication/services/account.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { UploadResearchComponent } from '../upload-research/upload-research.component';
import { ResearchService } from 'src/app/authentication/services/research.service';
export interface Tile {
  src: string;
  cols: number;
  rows: number;
  // text: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private researchService: ResearchService,
    // public dialog: MatDialog
  ) { }

  tiles: Tile[] = [
    {cols: 1, rows: 1, src: 'E_SDG_logo_UN_emblem_square_trans_PRINT-2048x1757.png'},
    {cols: 1, rows: 1, src: '1.png'},
    {cols: 1, rows: 1, src: '2.png'},
    {cols: 1, rows: 1, src: '3.png'},
    {cols: 1, rows: 1, src: '4.png'},
    {cols: 1, rows: 1, src: '5.png'},
    {cols: 1, rows: 1, src: '6.png'},
    {cols: 1, rows: 1, src: '7.png'},
    {cols: 1, rows: 1, src: '8.png'},
    {cols: 1, rows: 1, src: '9.png'},
    {cols: 1, rows: 1, src: '10.png'},
    {cols: 1, rows: 1, src: '11.png'},
    {cols: 1, rows: 1, src: '12.png'},
    {cols: 1, rows: 1, src: '13.png'},
    {cols: 1, rows: 1, src: '14.png'},
    {cols: 1, rows: 1, src: '15.png'},
    {cols: 1, rows: 1, src: '16.png'},
    {cols: 1, rows: 1, src: '17.png'},
  ];

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  research$: any;


  ngOnInit(): void {
    this.fetchAllResearch();
    this.school_id = this.authService.school_id;
    this.getInfoUsingSchoolId(this.school_id)
    console.log('this,auth', this.authService.isUserAuthenticated);
  }



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
    // loop this.research$ and get the values
  }

  // OpenDialog() {
  //   this.dialog.open(UploadResearchComponent);
  // }

}
