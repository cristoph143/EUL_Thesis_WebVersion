import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';

export interface ListOfTeacher {
  SchoolID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  Department: string;
  Approve: string;
}
@Component({
  selector: 'app-list-of-teacher',
  templateUrl: './list-of-teacher.component.html',
  styleUrls: ['./list-of-teacher.component.css']
})
export class ListOfTeacherComponent implements OnInit, AfterViewInit {

 
  

  ListOfTeacher: ListOfTeacher[] = [];
  dataSource = new MatTableDataSource<ListOfTeacher>(this.ListOfTeacher);

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }
  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private _liveAnnouncer: LiveAnnouncer,
    private cdr: ChangeDetectorRef,
  ) {
  }

  displayedColumns: string[] = [
    'SchoolID', 'FirstName', 'LastName', 'Email', 'Department', 'Approve', 'Edit', 'Delete'
  ];



  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<ListOfTeacher>(this.ListOfTeacher);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
    }

  account$: any;
  isAuthenticated = false;
  isLoggedIn$!: Observable<boolean>;
  full_name$: any;
  school_id: any;
  ngOnInit(): void {
    this.school_id = this.authService.school_id;
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type =
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.getAllSpecificRole();
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<ListOfTeacher>(this.ListOfTeacher);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  length: any;
  // getAllSpecificRole
  getAllSpecificRole() {
    this.accService.getAllSpecificRoles('teacher').subscribe((data: any) => {
      for (let i = 0; i < data[0].length; i++) {
        this.ListOfTeacher.push({
          SchoolID: data[0][i].school_id,
          FirstName: data[0][i].first_name,
          LastName: data[0][i].last_name,
          Email: data[0][i].email,
          Role: data[0][i].roleName,
          Department: data[0][i].departmentName,
          Approve: data[0][i].approve,
        });
      }
      this.dataSource = new MatTableDataSource<ListOfTeacher>(this.ListOfTeacher);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
      this.dataSource.sort = this.sort;
      this.length = data[0].length;
    });
  }

  approve(element: any) {
    console.log(element)
    // this.accService.approveChairman(element.SchoolID).subscribe((data: any) => {
    //   console.log(data)
    //   this.getAllSpecificRole();
    // });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  search: string = '';

  onChanges(event: any) {
    this.search = event;
    this.dataSource.filter = this.search.trim().toLowerCase();
  }


  edit(element: any) {
    console.log(element)
  }

  delete(element: any) {
    console.log(element)
  }

  add() {
    console.log('add')
  }

}
