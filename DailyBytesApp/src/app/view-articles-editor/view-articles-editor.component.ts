import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IArticle } from '../dailybytes-interfaces/article';

@Component({
  selector: 'app-view-articles-editor',
  templateUrl: './view-articles-editor.component.html',
  styleUrls: ['./view-articles-editor.component.css']
})
export class ViewArticlesEditorComponent implements OnInit {

  articlesList: IArticle[] = [];
  message: string = "There is no articles to review :)";
  constructor(private readonly _articleService: ArticleService) { }

  ngOnInit() {
    let userId = Number(sessionStorage.getItem('userId'));
    this.getArticlesForReview(userId);
  }

  getArticlesForReview(userId: number) {
    this._articleService.getArticlesByEditorId(userId).subscribe(
      responseData => {
        this.articlesList = responseData;
        if (this.articlesList.length > 0) {
          this.message = "Articles waiting for your review:";
        }
      },
      responseError => {
        this.articlesList = [];
      },
      () => console.log("getArticlesForReview executed!")
    )
  }
}
