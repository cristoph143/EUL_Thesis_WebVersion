import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-chairman',
  templateUrl: './add-chairman.component.html',
  styleUrls: ['./add-chairman.component.css']
})
export class AddChairmanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // <!-- SchoolID, First Name, Last Name, Email, Role, Department, Password, Approve -->
  form: FormGroup = new FormGroup({
    schoolID: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    approve: new FormControl('', Validators.required),
  });

  onSubmit() {
  }

}
