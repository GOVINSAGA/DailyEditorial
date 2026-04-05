import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly router: Router) { }

  loginSuccess(email: string, roleId: number) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userName', email);
    sessionStorage.setItem('roleId', roleId.toString());

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggesIn') === 'true';
  }

  getRoleId(): number {
    const role = sessionStorage.getItem('roleId');
    return role ? Number(role) : 0;
  }

  getUserName(): string | null {
    return sessionStorage.getItem('userName');
  }
}
