import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // isAuthenticated = false;

  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
  //     this.isAuthenticated = isLoggedIn;
  //   });
  // }

  // logout(): void {
  //   localStorage.removeItem("token");
  //   this.authService.isUserLoggedIn$.next(false);
  //   this.router.navigate(["login"]);
  // }

}
