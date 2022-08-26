import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pending } from '../model/pending';
import { PendingCrudService } from '../services/pending-crud.service';
import { Observable, tap } from "rxjs";
@Component({
  selector: 'app-unhome',
  templateUrl: './unhome.component.html',
  styleUrls: ['./unhome.component.css']
})
export class UnhomeComponent implements OnInit {

  pending$!: Observable<Pending[]>; 

  constructor(
    private pendingCrudService: PendingCrudService,
    private router: Router) { }

  ngOnInit(): void {
    this.pending$ = this.fetchAll();
    console.log('oe ' + this.pending$.forEach(pending => console.log(pending)));
  }

  req_form: FormGroup = new FormGroup({
    email_req: new FormControl('', Validators.required),
    school_id_req: new FormControl('', Validators.required),
    role_req: new FormControl('', Validators.required),
  });

  onSubmitReq() {
    const email = this.req_form.value.email_req;
    const school_id = this.req_form.value.school_id_req
    const role = this.req_form.value.role_req
    // print email_req, school_id_req, role_req
    console.log(email);
    console.log(school_id);
    console.log(role);
    if (!this.req_form.valid) {
      alert("Invalid Request");
      return;
    }
    
    // post pending to pending table
    this.pending$ = this.pendingCrudService
      .createPending({ email, school_id, role, approve: false })
      .pipe(
        tap(() => (
          this.pending$ = this.fetchAll()
        )),
      );
    
    this.router.navigate(['/']);
    console.log('Success');
    console.log(this.pending$);
  }

  // HTTP Request

// fetch all
  fetchAll(): Observable<Pending[]> {
    return this.pendingCrudService.fetchAllPending();
  }




  // post(groceryItem: Partial<Grocery>): void {
  //   const item = (<string>groceryItem).trim();
  //   if (!item) return;

  //   this.groceries$ = this.groceryListCrudService
  //     .post({ item })
  //     .pipe(tap(() => (this.groceries$ = this.fetchAll())));
  // }

}
