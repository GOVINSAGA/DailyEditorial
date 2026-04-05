import { Component } from '@angular/core';
import { AuthService } from '../dailybytes-services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent {
  roleId: number;
  userName: string | null;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.roleId = this.authService.getRoleId();
    this.userName = this.authService.getUserName();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }


}
