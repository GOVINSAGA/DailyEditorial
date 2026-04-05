import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journalist-layout',
  templateUrl: './journalist-layout.component.html',
  styleUrls: ['./journalist-layout.component.css']
})
export class JournalistLayoutComponent  {
  userName = sessionStorage.getItem('userName');
  constructor(private readonly router: Router) { }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
