import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/authentication/services/account.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FileService } from 'src/app/authentication/services/file.service';
import { Account } from '../../authentication/model/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private accService: AccountService,
    private fileService: FileService
  ) { }
  account$: any;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const token_arr = JSON.parse(token!);
    const type = 
      token_arr.hasOwnProperty('userId') ? token_arr.userId : token_arr.school_id;
    this.getInfoUsingSchoolId(type);
    this.school_id = type;
    console.log(this.school_id)
    this.getProfile();
  }

  userId: Pick<Account, "school_id"> | undefined;
  school_id: any;

  getProfile() {
    console.log(this.school_id)
    this.fileService.getProfile(this.school_id).subscribe((data: any) => {
      console.log(data);
      this.img = data;
      this.blobToImage(data);
    });
  }


  imageToShow: any;

  // convert blob to image
  blobToImage(blob: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
    }, false);
    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  getInfoUsingSchoolId(school_id: any) {
    console.log(school_id, 'school_id');
    let res: never[] = [];
    // return this.accService.fetchAccount(school_id);
    this.accService
      .fetchAccountUsingId(
        school_id
    )
      .subscribe((data:any) => {
        console.log(data[0][0]);
        res = data[0][0];
        this.getAcc(res);
        return data[0][0];
      }
    );
  }

  img: any;

  getAcc(res:any) {
    console.log(res)
    const curr_acc = res;
    console.log(curr_acc, 'curr_acc');
    this.account$ = curr_acc;
    console.log(this.account$, 'account$');
  }

  profile: FormGroup = new FormGroup({
    school_id: new FormControl(
      '',
      Validators.required,
    ),
    first_name: new FormControl(
      '',
      Validators.required,
    ),
    last_name: new FormControl(
      '',
      Validators.required,
    ),
    email: new FormControl(
      '',
      Validators.required,
    ),
    role: new FormControl(
      '',
      Validators.required,
    ),
    department: new FormControl(
      '',
      Validators.required,
    ),
  });
}
