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

  tiles: Tile[] = [
    {cols: 1, rows: 1, src: 'E_SDG_logo_UN_emblem_square_trans_PRINT-2048x1757.png', redirect: '', disabled: true,title: "",sub_title: "", background: ""},
    {cols: 1, rows: 1, src: '1.png', redirect: OneComponent, disabled:false, title: "Goal 1: No Poverty", sub_title: "No End Poverty In All Its Forms Everywhere", background: "goal 1.jpg"},
    {cols: 1, rows: 1, src: '2.png', redirect: OneComponent, disabled:false, title: "Goal 2: Zero Hunger", sub_title: "End Hunger, achieve food security and improved nutrition and promote sustainable agriculture", background: "goal 2.jpg"},
    {cols: 1, rows: 1, src: '3.png', redirect: OneComponent, disabled:false, title: "Goal 3: Good Health and Well-Being", sub_title: "Ensure healthy lives and promote well-being for all at all ages", background: "goal 3.jpeg"},
    {cols: 1, rows: 1, src: '4.png', redirect: OneComponent, disabled:false, title: "Goal 4: Quality Education", sub_title: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all", background: "goal 4.jpg"},
    {cols: 1, rows: 1, src: '5.png', redirect: OneComponent, disabled:false, title: "Goal 5: Gender Equality", sub_title: "Achieve gender equality and empower all women and girls", background: "goal 5.jpg"},
    {cols: 1, rows: 1, src: '6.png', redirect: OneComponent, disabled:false, title: "Goal 6: Clean Water and Sanitation", sub_title: "Ensure availability and sustainable management of water and sanitation for all", background: "goal 6.jpg"},
    {cols: 1, rows: 1, src: '7.png', redirect: OneComponent, disabled:false, title: "Goal 7: Affordable and Clean Energy", sub_title: "Ensure access to affordable, reliable, sustainable and modern energy for all", background: "goal 7.jpg"},
    {cols: 1, rows: 1, src: '8.png', redirect: OneComponent, disabled:false, title: "Goal 8: Decent Work and Economic Growth", sub_title: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all", background: "goal 8.jpg"},
    {cols: 1, rows: 1, src: '9.png', redirect: OneComponent, disabled:false, title: "Goal 9: Industry, Innovation, and Infrastructire", sub_title: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation", background: "goal 9.jpg"},
    {cols: 1, rows: 1, src: '10.png', redirect: OneComponent, disabled:false, title: "Goal 10: Reduced Inequalities", sub_title: "Reduce inequality within and among countries", background: "goal 10.jpg"},
    {cols: 1, rows: 1, src: '11.png', redirect: OneComponent, disabled:false, title: "Goal 11: Sustainable Cities and Communities", sub_title: "Make cities and human settlements inclusive, safe, resilient and sustainable", background: "goal 11.jpg"},
    {cols: 1, rows: 1, src: '12.png', redirect: OneComponent, disabled:false, title: "Goal 12: Responsible Consumption and Production", sub_title: "Ensure sustainable consumption and production patterns", background: "goal 12.jpg"},
    {cols: 1, rows: 1, src: '13.png', redirect: OneComponent, disabled:false, title: "Goal 13: Climate Action", sub_title: "Take urgent action to combat climate change and its impacts", background: "goal 13.jpg"},
    {cols: 1, rows: 1, src: '14.png', redirect: OneComponent, disabled:false, title: "Goal 14: Life Below Water", sub_title: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development", background: "goal 14.jpg"},
    {cols: 1, rows: 1, src: '15.png', redirect: OneComponent, disabled:false, title: "Goal 15: Life on Land", sub_title: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss", background: "goal 15.jpg"},
    {cols: 1, rows: 1, src: '16.png', redirect: OneComponent, disabled:false, title: "Goal 16: Peace, Justice, and Strong Institutions", sub_title: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels", background: "goal 16.jpg"},
    {cols: 1, rows: 1, src: '17.png', redirect: OneComponent, disabled:false, title: "Goal 17: Partnership for the goals", sub_title: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development", background: "goal 17.jpg"},
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

  nav(dest: any) {
    alert(dest)
    this.router.navigate([dest]);
  }

  curr: any;
  

  openDialog(dialogReference: any, src: any, title: any, sub_title: any, background: any) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.data = {
      src,
      title,
      sub_title,
      background
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
