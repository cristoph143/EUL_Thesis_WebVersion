import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ResearchService } from 'src/app/authentication/services/research.service';

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
      console.log(this.data.res + "data");
      console.log(this.getSimilarAuthors()); 
      console.log(this.authors, 'authors');
  }

  authors: any;

  getSimilarAuthors() {
    this.researchService.getSimilarsAuthors(this.data.res.research_id).subscribe((res: any) => {
      console.log(res[0]);
      this.authors = res[0];
      console.log(this.authors, 'authors');
    })
    console.log(this.authors, 'authors');
  }

}
