import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole(): any {
    return window.sessionStorage.getItem("role");
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, JSON.stringify(user));
  }

  role: any;

  public setRole(role: any): void {
    this.role = role;
  }

  public getRoled(): any {
    return this.role;
  }

  public getTokens(): any {
    return !!localStorage.getItem("token"); 
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(TOKEN);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}