import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  
  @Output() submitClicked = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private accService: AccountService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  form: FormGroup = new FormGroup({
    // from data.res
    title: new FormControl('', Validators.required),
    abstract: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

    

  ngOnInit(): void {
    console.log(this.data.res + "data");
    // display data in form
    this.form.setValue({
      title: this.data.res.title,
      abstract: this.data.res.abstract,
      year: this.data.res.date_published,
    });
  }

  onSubmit() {
    this.submitClicked.emit(this.form.value);
    this.dialog.closeAll();
  }

}
