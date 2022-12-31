import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/authentication/services/account.service';
import { ResearchService } from './../../authentication/services/research.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})
export class SummaryPageComponent implements OnInit {

  constructor(
    private acc_service: AccountService,
    private res_service: ResearchService
  ) { }

  ngOnInit(): void {

    this.getNumOfUser("chairman");
    this.getNumOfUser("teacher");
    this.getNumOfUser("student");
  }
  total_users: any;


  firstTabs: any = [
    { title: 'Chairman' },
    { title: 'Teacher'},
    { title: 'Student'},
  ];
  secondTabs: any = [
    { title: 'Total User'},
    { title: 'Total Research'},
    { title: 'Total Departments'},
  ];

  studentsPerDepartment: any;
  teachersPerDepartment: any;
  researchPerDepartment: any;
  numOfChairman: any;
  numOfTeacher: any;
  numOfStudent: any;

  getNumOfUser(role: string) {
    let numOfUser = 0;
    let totUser = 0;
    this.acc_service.getNumOfUser(role).subscribe((data: any) => {
      numOfUser = data[0][0].count;
      if (role == "chairman") {
        this.numOfChairman = numOfUser;
      }
      else if (role == "teacher") {
        this.numOfTeacher = numOfUser;
      }
      else if (role == "student") {
        this.numOfStudent = numOfUser;
      }
    });
  }
}
