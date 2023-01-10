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
    // const role = this.token.role;
    let token = this.token.getTokens();
    console.log(token)
    // this.authService.
    console.log(this.role)
    if(this.role == null) {
      console.log(this.role)
    }
    const roleName = "";
    // const roleName = role == 1 ? 'Admin' : role == 2
    //   ? 'Chairman' : role == 3
    //   ? 'Teacher' : role == 4 ? 'Student' : 'guest';
    console.log(roleName)
    const expectedRole = route.data['expectedRoles'];
    const roleMatches = expectedRole.includes(roleName);
    console.log(roleMatches)
    if (!roleMatches) {
      // this.router.navigate(['/login']);
      // remove token
      // this.token.signOut();
      return !roleMatches;
    }
    return roleMatches;
  }

}