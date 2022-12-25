
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private token: TokenStorageService) { }

  canActivate(): boolean {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
    console.log(this.token.getTokens() + 'not')
    return this.token.getTokens();
  }
}