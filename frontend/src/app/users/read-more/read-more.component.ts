import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';


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
    private researchService: ResearchService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    
  ngOnInit(): void {
    console.log(this.data.account.school_id + 'account');
      console.log(this.data.res + "data");
      console.log(this.getSimilarAuthors()); 
      console.log(this.authors, 'authors');
      this.formatDate();
    console.log(this.data.all_res + "data");
  }

  authors: any;

  rel_res: any;
  getSimilarAuthors() {
    console.log(this.authors, 'authors');
    console.log(this.data.res.sdg_category)
    // get all researches with the same sdg_category with this.data.all_res
    this.rel_res = this.data.all_res.filter((res: { sdg_category: any; }) => res.sdg_category === this.data.res.sdg_category);
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



}
