
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //     if (this.authService.isUserLoggedIn$ == false) {
  //       this.router.navigate(["/signup"]);
  //       return false;
  //   }
  //   return true;
  // }
  canActivate(): Observable<boolean> {
    if (!this.authService.isUserLoggedIn$.value) {
    this.router.navigate(["/signup"]);
  }
  return this.authService.isUserLoggedIn$;
}
}