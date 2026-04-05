import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IArticle } from '../dailybytes-interfaces/article';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent implements OnInit {
  userName = sessionStorage.getItem('userName');
  roleId: number = 0;
  routeName: string = "";
  articlesList: IArticle[] = [];
  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly _articleService: ArticleService) { }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.roleId = Number(sessionStorage.getItem('roleId'));
    if (this.roleId === 1 || this.roleId === 2) {
      this.router.navigate(['/']);
    }
    let routeName = this.route.snapshot.routeConfig?.path;
    if (routeName === "editor") {
      this.routeName = routeName;
    }

    this._articleService.getPublishedArticles().subscribe(
      responseData => {
        this.articlesList = responseData;
      },
      responseError => {
        this.articlesList = [];
      }
    )
  }
}
