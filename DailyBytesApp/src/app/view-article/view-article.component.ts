import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IArticle } from '../dailybytes-interfaces/article';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ViewArticleComponent implements OnInit {
  keyword: string = '';
  errorMessage: string = '';
  articlesList: IArticle[] = [];
  userName: string = "";
  isLoggedIn: boolean = false;
  isPremiumUser: boolean = false; // ADD THIS LINE
  
  constructor(private readonly _articleService: ArticleService, private readonly router: Router) {
    let userEmail = sessionStorage.getItem("userName");
    if (userEmail) {
      this.isLoggedIn = true;
      this.userName = userEmail.split("@")[0];
    }
    
    // ADD THESE LINES - Check if user has Premium membership
    let membership = sessionStorage.getItem('membership');
    this.isPremiumUser = membership === 'Premium';
  }

  ngOnInit() {
    let userName = sessionStorage.getItem('userName');
    if (!userName) {
      this.router.navigate(['/']);
    }
    this.getAllArticles();
  }

  searchArticle() {
    if (!this.keyword || this.keyword.trim().length === 0) {
      this.errorMessage = 'Keyword is reqquired to search articles';
      return;
    }

    this.errorMessage = '';

    console.log('Searching article with keyword', this.keyword);
  }

  getAllArticles() {
    this._articleService.getPublishedArticles().subscribe(
      responseArticle => {
        this.articlesList = responseArticle;
        this.articlesList.forEach(article => {
          console.log(article);
        })
      },
      responseError => {
        console.log(responseError);
      },
      () => console.log("GetAllArticlesExecutes")
    )
  }

  openArticle(id: number) {
    this.router.navigate(['/read-article',id])
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
