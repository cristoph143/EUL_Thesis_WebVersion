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
    this.getCountOfDepartment();
    this.getCountOfResearchDetails();
  }
  total_users: any;


  firstTabs: any = [
    { title: 'Chairman' },
    { title: 'Teacher'},
    { title: 'Student'},
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
        var numOfStudent = this.numOfStudent ? this.numOfStudent : 0;
        var numOfTeacher = this.numOfTeacher ? this.numOfTeacher : 0;
        totUser = numOfUser + numOfTeacher + numOfStudent;
        console.log(totUser + "chairman   " + numOfUser)
      }
      else if (role == "teacher") {
        this.numOfTeacher = numOfUser;
        var numOfChairman = this.numOfChairman ? this.numOfChairman : 0;
        var numOfStudent = this.numOfStudent ? this.numOfStudent : 0;
        totUser = numOfUser + numOfChairman + numOfStudent;
        console.log(totUser + "chairman   " + numOfUser)
      }
      else if (role == "student") {
        this.numOfStudent = numOfUser;
        var numOfChairman = this.numOfChairman ? this.numOfChairman : 0;
        var numOfTeacher = this.numOfTeacher ? this.numOfTeacher : 0;
        totUser = numOfUser + numOfTeacher + numOfChairman;
        console.log(totUser + "chairman   " + numOfUser)
      }
      this.total_users = totUser;
    });
    console.log(this.total_users)
  }

  CountOfDepartment = 0;

  getCountOfDepartment() {
    this.res_service.getCountOfDepartment().subscribe((data: any) => {
      this.CountOfDepartment = data.count[0].count;
    });
  }
  
  CountOfResearchDetails = 0;
  
  getCountOfResearchDetails () {
    this.res_service.getCountOfResearchDetails().subscribe((data: any) => {
      this.CountOfResearchDetails = data.count[0].count;
    });
  }
}
