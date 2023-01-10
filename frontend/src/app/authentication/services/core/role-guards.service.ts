import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
import { AccountService } from 'src/app/authentication/services/account.service';
@Injectable({
  providedIn: "root",
})
export class RoleGuardsComponent implements CanActivate {
  constructor(private router: Router, private token: TokenStorageService,
    private account_service: AccountService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean |
      UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }
  roles: [] = [];
  role: any;

  async isAuthorized(route: ActivatedRouteSnapshot): Promise<boolean> {
    let token: any = this.token.parseToken();
    // convert the string value of token to JSON
    let toJson: any = {};
    toJson = JSON.parse(token);
    console.log(toJson);
    const roleName = toJson.role;
    console.log(roleName)
    const expectedRole = route.data['expectedRoles'];
    // check if roleName matches in expectedRole
    const matchRoles = expectedRole.includes(roleName);
    console.log(matchRoles);
    // if (!matchROles) {

    // }
    return matchRoles ? true : false;
  }

}