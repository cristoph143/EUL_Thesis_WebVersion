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

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(TOKEN);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}