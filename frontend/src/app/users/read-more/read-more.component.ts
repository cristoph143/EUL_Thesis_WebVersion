import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';
import { FileService } from './../../authentication/services/file.service';


export interface Tabs {
  label: string;
}
@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private fileService: FileService, 
    private researchService: ResearchService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    
  school_id: any;
  ngOnInit(): void {
    console.log(this.data.account.school_id + 'account');
    console.log(this.data.res + "data");
    // console.log(this.getSimilarAuthors()); 
    console.log(this.getSimilarAuthors()); 
    console.log(this.authors, 'authors');
    this.formatDate();
    console.log(this.data.all_res + "data");
    this.school_id = this.data.account.school_id;
    console.log(this.data.num_views);
    this.getNumberOfViews();
    console.log(this.data.ownership)
    console.log(this.data.res.departmentName)
    this.researchService.checkResearchList(this.data.res.research_id, this.data.account.school_id).subscribe((res: any) => {
      console.log(res.count[0].count);
      if (res.count[0].count == 0) {
        this.bookmarkIcon = false;
      }
      else {
        this.bookmarkIcon = true;
      }
    });
  }

  bookmarkIcon: any;

  bookmark() {
    this.researchService.checkResearchList(this.data.res.research_id, this.data.account.school_id).subscribe((res: any) => {
      console.log(res.count[0].count);
      if (res.count[0].count == 0) {
        this.researchService.addMyResearchList(this.data.res.research_id, this.data.account.school_id).subscribe((res: any) => {
          console.log(res);
          this.bookmarkIcon = true;
        });
      }
      else {
        this.researchService.removeMyResearchList(this.data.res.research_id, this.data.account.school_id).subscribe((res: any) => {
          console.log(res);
          this.bookmarkIcon = false;
        });
      }
    });
    console.log(this.bookmarkIcon)
    // // if this.bookmarkIcon is false
    // if(this.bookmarkIcon == false) {
    //   this.bookmarkIcon = true;
    // } else {
    //   this.bookmarkIcon = false;
    // }
  }

  download() {
    let research_id = this.data.res.research_id;
    console.log("resID" + research_id)
    // this.fileService.downloadFile(research_id).subscribe((res: any) => {
      //   console.log(res);
      //   const blob = new Blob([res], { type: 'application/pdf' });
      //   const url = window.URL.createObjectURL(blob);
      //   window.open(url);
      // })
    // call file service to download file
    this.fileService.downloadFile(research_id).subscribe((res: any) => {
      console.log(res);
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  deleteRes() {
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
          this.researchService.deleteResearch(this.data.res.research_id).subscribe((data: any) => {
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

  num_views: any;
  getNumberOfViews() {
    this.researchService.addNumberOfViews(this.data.res.research_id).subscribe((res: any) => {
      // extract the object result of res into String
      this.num_views = JSON.stringify(res.number_of_views[0]);
      // extract value of number of views from this.num_views
      this.num_views = this.num_views.split(":")[1];
      // remove special characters
      this.num_views = this.num_views.replace(/[^0-9]/g, "");
      console.log(this.num_views, 'num_views')
      console.log(this.num_views, 'num_views')
    })
  }

  authors: any;
  getSimilarAuthors() {
    // get the research_id from data.res
    let research_id = this.data.res.research_id;
    console.log(research_id, 'research_id');
    // extract all research in this.data.all_res using research_id
    let all_research = this.data.all_res.filter((res: any) => res.research_id == research_id);
    console.log(all_research, 'all_research');
    // save first_name and last_name in authors from all_research
    this.authors = all_research.map((res: any) => res.first_name + ' ' + res.last_name);
    console.log(this.authors, 'authors');
  }

  rel_res: any;
  getSimilarArticles() {
    console.log(this.authors, 'authors');
    console.log(this.data.res.sdg_category)
    // iterate this.data.res.sdg_category
    for (let i = 0; i < this.data.res.sdg_category.length; i++) { //sdg_category from current res
      // loop this.all_res
      for (let j = 0; j < this.data.all_res.length; j++) {
        // loop this.all_res.sdg_category
        for (let k = 0; k < this.data.all_res[j].sdg_category.length; k++) {
          // check if the current index of this.all_res.sdg_category is the same as this.res.sdg_category
          if (this.data.res.sdg_category[i] == this.data.all_res[j].sdg_category[k]) {
            // check if this.data.res.title is not the same as this.all_res[j].title
            if (this.data.res.title != this.data.all_res[j].title) {
              // append the research to array rel_res that has the same sdg_category
              this.rel_res += this.data.all_res[j];
              console.log(this.rel_res, 'rel_res--------------------------');
            }
          }
        }
      }
    }
    console.log(this.rel_res, 'rel_res');
  }

  date: any;
  // format the date
  formatDate() {
    // format to Month Day, Year
    this.date = new Date(this.data.res.date_published).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // tabs: Overview, Research Details, Authors, Cite this Research, Related Articles
  tabs: Tabs[] = [
    { label: 'Overview' },
    { label: 'Research Details' },
    { label: 'Authors' },
    { label: 'Cite this Research' },
    { label: 'Related Articles' },
  ];

  onTabClick(event: { tab: { textLabel: any; }; }) {
    console.log(event);
    console.log(event.tab.textLabel);
  }

  readMore(res: any) {
    console.log(this.data.account);
    this.researchService.addNumberOfViews(res.research_id).subscribe((res: any) => {
      console.log(res);
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    
    const all_res = this.data.all_res;
    console.log(all_res, 'all_res');
    dialogConfig.data = {
      res,
      all_res,
      account: this.data.account
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
