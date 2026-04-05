import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IArticle } from '../dailybytes-interfaces/article';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  articlesList: IArticle[] = [];
  userName: string = "";
  isLoggedIn: boolean = false;
  roleId: number = 0;
  constructor(private readonly _articleService: ArticleService, private readonly router: Router) {
    let userEmail = sessionStorage.getItem("userName");
    this.roleId = Number(sessionStorage.getItem("roleId"));
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (userEmail) {
      this.isLoggedIn = true;
      this.userName = userEmail.split("@")[0];
    }
  }

  ngOnInit() {
    const roleId = Number(sessionStorage.getItem("roleId"));
    if (this.isLoggedIn === true) {
      if (roleId === 1) {
        this.router.navigate(['/view-article']);
      } else if (roleId === 2) {
        this.router.navigate(['/journalist']);
      } else if (roleId === 3) {
        this.router.navigate(['/editor']);
      } 
      
    }
}

}
