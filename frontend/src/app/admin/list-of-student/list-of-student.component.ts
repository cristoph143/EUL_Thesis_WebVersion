import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/core/auth.service';
import { AccountColumns } from '../../authentication/model/account'

export interface ListOfStudent {
  id: number;
  SchoolID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  Department: string;
  Approve: string;
}
@Component({
  selector: 'app-list-of-student',
  templateUrl: './list-of-student.component.html',
  styleUrls: ['./list-of-student.component.css']
})
export class ListOfStudentComponent implements OnInit, AfterViewInit {
  ListOfStudent: ListOfStudent[] = [];
  dataSource = new MatTableDataSource<ListOfStudent>(this.ListOfStudent);

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
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

  columnsSchema: any = AccountColumns;

  displayedColumns: string[] = AccountColumns.map((col: { key: any; }) => col.key);

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<ListOfStudent>(this.ListOfStudent);
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
    this.school_id = type;
    this.getAllSpecificRole();
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<ListOfStudent>(this.ListOfStudent);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);

    console.log(this.displayedColumns)
    this.getRole();
    this.getDepartment();
  }

  ListOfStudentCopy: ListOfStudent[] = [];

  length: any;
  // getAllSpecificRole
  getAllSpecificRole() {
    this.accService.getAllSpecificRoles('student').subscribe((data: any) => {
      for (let i = 0; i < data[0].length; i++) {
        if (this.ListOfStudent.some((item) => item.SchoolID === data[0][i].school_id)) {
          continue;
        }
        this.ListOfStudent.push({
          id: i,
          SchoolID: data[0][i].school_id,
          FirstName: data[0][i].first_name,
          LastName: data[0][i].last_name,
          Email: data[0][i].email,
          Role: data[0][i].roleName,
          Department: data[0][i].departmentName,
          Approve: data[0][i].approve,
        });
        this.ListOfStudentCopy.push({
          id: i,
          SchoolID: data[0][i].school_id,
          FirstName: data[0][i].first_name,
          LastName: data[0][i].last_name,
          Email: data[0][i].email,
          Role: data[0][i].roleName,
          Department: data[0][i].departmentName,
          Approve: data[0][i].approve,
        });
      }
      this.dataSource = new MatTableDataSource<ListOfStudent>(this.ListOfStudent);
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

  addRow() {
    console.log('add')
  }

  removeSelectedRows(id: any) {
    if (confirm("Are you sure you want to delete this research?")) {
      // ask user for input password
      let password = prompt("Please enter your password to confirm");
      // check if the password is correct
      this.accService.confirmPasswordUsingId(this.school_id, password).subscribe((data: any) => {
        if (data.message == "Password is incorrect") {
          alert(data.message);
          return;
        }
        this.accService.deleteSchoolID(id).subscribe();
        // window.location.reload();
        this.getAllSpecificRole();
      });
    }
  }
  valid: any = {};

  disableSubmit(id: any) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

  editRow(element: any) {
    let check = false;
    console.log(element)
    console.log(this.ListOfStudentCopy[0].SchoolID)
    let index = this.ListOfStudentCopy.findIndex((item: any) => item.id === element.id);
    console.log(index)
    // use index to copy the row in this.ListOfStudentCopy
    let arr = this.ListOfStudentCopy[index];
    console.log(arr)
    // check if this.ListOfStudent is equal to the index of this.ListOfStudentCopy
    // if it is equal then return true
    // if it is not equal then return false
    if (this.ListOfStudentCopy.some((item: any) => item.SchoolID === element.SchoolID.trim() &&
      item.FirstName === element.FirstName.trim() && item.LastName === element.LastName.trim() &&
      item.Email === element.Email.trim() && item.Role === element.Role.trim() &&
      item.Department === element.Department.trim() && item.Approve === element.Approve)) {
      return;
    }
    // use id to get the index of the row in this.ListOfStudentCopy
    let errCheck = this.errorChecking(element, check, arr);
    console.log(errCheck)
    if (!errCheck) {
      const old_school_id = this.ListOfStudentCopy[index].SchoolID;
      const role_roleID = this.roles.find((item: any) => item.roleName === element.Role.trim()).roleID;
      const departmentID = this.departments.find((item: any) => item.departmentName === element.Department.trim()).departmentID;
      const account = {
        school_id: element.SchoolID.trim(),
        first_name: element.FirstName.trim(),
        last_name: element.LastName.trim(),
        email: element.Email.trim(),
        role_roleID: role_roleID,
        departmentID: departmentID,
        approve: element.Approve,
      };
      // iterate account and print
      for (const [key, value] of Object.entries(account)) {
        console.log("Account: " + key + " = " + value);
      }
      console.log(account + '\n' + old_school_id)
      this.accService.editSchoolID(old_school_id, account).subscribe((data: any) => {
        alert(data.message)
        // reload window
        window.location.reload();
      });
    }
  }

  roles: any;
  departments: any;


  private errorChecking(element: any, check: boolean, arr: any) {

    let SchoolIDCheck = this.ListOfStudentCopy.some((item: any) => item.SchoolID === element.SchoolID.trim());
    let userNameCheck = this.ListOfStudentCopy.some((item: any) => item.FirstName === element.FirstName.trim() && item.LastName === element.LastName.trim() && item.SchoolID !== element.SchoolID.trim())
    let emailCheck = this.ListOfStudentCopy.some((item: any) => item.Email === element.Email.trim());
    let emailAndSchoolIDCheck = this.ListOfStudentCopy.some((item: any) => item.Email === element.Email.trim() && item.SchoolID !== element.SchoolID.trim())
    let depCheck = (this.departments.filter((department: any) => department.departmentName === element.Department.trim()).length === 0);
    let roleCheck = (this.roles.filter((role: any) => role.roleName === element.Role).length === 0);
    console.log(emailCheck + ' ' + emailAndSchoolIDCheck + ' ' + SchoolIDCheck)
    // convert element.Approve to number
    element.Approve = parseInt(element.Approve);
    let approveCheck = element.Approve !== 0 && element.Approve !== 1;
    console.log(!depCheck + ' ' + !approveCheck + ' ' + !roleCheck + ' ' + !userNameCheck + ' ' + !emailAndSchoolIDCheck + ' ' + SchoolIDCheck)
    let idCheck, userName, email, role, department, approve = false;
    // iterate through element
    console.log(arr)
    for (let i = 0; i < Object.keys(element).length; i++) {
      // check if element is empty
      if (element[Object.keys(element)[i]] === '') {
        alert('Please fill up all the fields');
        element.SchoolID = element.SchoolID === '' ? arr.SchoolID : element.SchoolID;
        element.FirstName = element.FirstName === '' ? arr.FirstName : element.FirstName;
        element.LastName = element.LastName === '' ? arr.LastName : element.LastName;
        element.Email = element.Email === '' ? arr.Email : element.Email;
        element.Role = element.Role === '' ? arr.Role : element.Role;
        element.Department = element.Department === '' ? arr.Department : element.Department;
        element.Approve = element.Approve === '' ? arr.Approve : element.Approve;
        return false;
      }
      // if object.kys(element)[i] is SchoolID
      if (Object.keys(element)[i] === 'SchoolID') {
        // get the index of the current SchoolID in this.ListOfStudentCopy using first_name and last_name as index
        // check if SchoolID is still equal to the copy
        // console.log(copy[0].SchoolID + " is still equal to " + element.SchoolID.trim())
        if (element.SchoolID.trim() === arr.SchoolID) {
          idCheck = false;
          continue;
        }
        else {
          idCheck = this.schoolIDCheck(SchoolIDCheck, element, idCheck, arr);
        }
        continue;
      }
      // if object.kys(element)[i] is FirstName or LastName
      if (Object.keys(element)[i] === 'FirstName' && Object.keys(element)[i + 1] === 'LastName') {
        console.log(element.FirstName.trim() + " is still equal to " + arr.FirstName)
        // check if FirstName and LastName is still equal to the copy
        if (element.FirstName.trim() === arr.FirstName && element.LastName.trim() === arr.LastName) {
          console.log("sss" + element)
          userName = false;
          continue;
        } else {
          userName = this.usernameCheck(userNameCheck, element, userName, arr);
        }
        continue;
      }
      // if object.kys(element)[i] is Email
      if (Object.keys(element)[i] === 'Email') {
        if (element.Email.trim() === arr.Email) {
          email = false;
          continue;
        } else {
          email = this.emailAndSchoolIDCheck(emailAndSchoolIDCheck, emailCheck, SchoolIDCheck, element, email, arr);
        }
      }
    }
    department = this.depCheck(depCheck, element, department, arr);
    role = this.roleCheck(roleCheck, element, check, arr);
    approve = this.approveCheck(approveCheck, element, check, arr);
    console.log(idCheck + ' ' + userName + ' ' + email + ' ' + role + ' ' + department + ' ' + approve)
    if (idCheck == false && userName == false && email == false && role == false && department == false && approve == false) {
      check = false;
      console.log('dd')
    }
    else {
      check = true;
    }
    return check;
  }

  private emailAndSchoolIDCheck(emailAndSchoolIDCheck: boolean, emailCheck: boolean, SchoolIDCheck: boolean, element: any, email: any, arr: any) {
    if (emailAndSchoolIDCheck) {
      alert('Email and School ID already exist');
      element.Email = arr.Email;
      element.SchoolID = arr.SchoolID;
    } else {
      if (emailCheck) {
        // set the index to the element
        element.Email = arr.Email;
        email = true;
        alert("Email already exist");
      }
      else if (SchoolIDCheck) {
        // set the index to the element
        element.SchoolID = arr.SchoolID;
        email = true;
        alert("School ID already exist");
      } else {
        email = false;
      }
    }
    return email;
  }

  private approveCheck(approveCheck: boolean, element: any, check: boolean, arr: any) {
    if (approveCheck) {
      element.Approve = arr.Approve;
      alert('Approve can only be 0 or 1');
      check = true;
    }
    return check;
  }

  private roleCheck(roleCheck: boolean, element: any, check: boolean, arr: any) {
    if (roleCheck) {
      element.Role = arr.Role;
      alert('Role does not exist');
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  private depCheck(depCheck: boolean, element: any, department: any, arr: any) {
    if (depCheck) {
      element.Department = arr.Department;
      console.log(element.Department);
      alert('Department does not exist');
      department = true;
    } else {
      department = false;
    }
    return department;
  }

  private usernameCheck(userNameCheck: boolean, element: any, userName: any, arr: any) {
    if (userNameCheck) {
      alert("First name and last name already exist" + element.FirstName + ' ' + element.LastName);
      console.log(element)
      // set the index to the element
      element.FirstName = arr.FirstName;
      element.LastName = arr.LastName;
      element.SchoolID = arr.SchoolID;
      userName = true;
    } else {
      userName = false;
    }
    return userName;
  }

  private schoolIDCheck(SchoolIDCheck: boolean, element: any, idCheck: any, arr: any) {
    if (SchoolIDCheck) {
      // ignore row when filtering this.ListOfStudentCopy if element.FirstName === item.FirstName && element.LastName === item.LastName
      let copy = this.ListOfStudentCopy.filter((item: any) => item.FirstName !== element.FirstName.trim() || item.LastName !== element.LastName.trim());
      let check = copy.some((item: any) => item.SchoolID === element.SchoolID.trim());
      console.log(check);
      if (check) {
        alert('School ID already exist' + element.SchoolID);
        element.SchoolID = arr.SchoolID;
        idCheck = true;
      } else {
        idCheck = false;
      }
    } else {
      idCheck = false;
    }
    return idCheck;
  }

  private getRole() {
    this.accService.fetchAllRoles().subscribe((data: any) => {
      this.roles = data[0];
      this.roles = data[0].filter((role: any) => role.roleID !== 1 && role.roleID !== 2);
      // add Admin and Chairman into this.roles
      this.roles.push({ roleID: 1, roleName: 'Admin' });
      this.roles.push({ roleID: 2, roleName: 'Chairman' });
    });
  }

  private getDepartment() {
    this.accService.fetchAllDepartments().subscribe((data: any) => {
      this.departments = data[0];
    });
  }

}
