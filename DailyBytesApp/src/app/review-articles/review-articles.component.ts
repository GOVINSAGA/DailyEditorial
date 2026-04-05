import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IArticle } from '../dailybytes-interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-articles',
  templateUrl: './review-articles.component.html',
  styleUrls: ['./review-articles.component.css']
})
export class ReviewArticlesComponent implements OnInit {

  article = {
    articleId: 1024,
    headline: 'DailyBytes Launches New Platform',
    subHeading: 'A modern media publishing solution',
    category: 'Technology',
    editor: 'John Editor',
    mediaId: 'MED-8891',
    content: `Ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
Updated text here.`
  };

  reviewComments: string = '';
  userId: number = 0;
  articlesList: IArticle[] = [];
  articleId: number = 0;
  currentArticle!: IArticle;
  message: string = "";

  constructor(private readonly _articleServie: ArticleService, private readonly route: ActivatedRoute, private readonly router: Router) {
    let userId = Number(sessionStorage.getItem('userId'));
    this.userId = userId;
  }

  ngOnInit() {
    if (this.userId) {
      this.getArticlesForReview(this.userId);
    }

    let articleId = Number(this.route.snapshot.params['articleId']);
    if (articleId) {
      this.articleId = articleId;
      this.getArticle(articleId);
    }
  }

  approve() {
    this._articleServie.publishArticle(this.articleId).subscribe(
      responseData => {
        if (responseData) {
          alert('Article published successfully')
        } else {
          alert('Article not published')
        }
      },
      responseError => {
        alert('Something went wrong');
        console.log(responseError);
      },
      () => console.log("Publish Article executed successfully")
    )
  }

  sendFeedback() {
    this._articleServie.sendFeedback(this.articleId, this.reviewComments).subscribe(
      responseData => {
        if (responseData) {
          alert("Feedback Addedd Successfully!");
        } else {
          alert("Feedback not added, please try again!");
        }
      },
      responseError => {
        console.log("Some error occurred : ", responseError);
      },
      () => console.log("sendFeedback executed successfully")
    )
  }

  cancel() {
    this.router.navigate(['/review']);
  }

  getArticlesForReview(userId: number) {
    this._articleServie.getArticlesByEditorId(userId).subscribe(
      responseData => {
        this.articlesList = responseData;
      },
      responseError => {
        this.articlesList = [];
      },
      () => console.log("getArticlesForReview executed!")
    )
  }

  getArticle(articleId: number) {
    this._articleServie.getArticlesById(articleId).subscribe(
      responseData => {
        if (!responseData) {
          alert("Article not found, try refreshing the page");
          return;
        }
        this.currentArticle = responseData;
        this.currentArticle.categoryName = getCategoryName(responseData.categoryId);
      },
      responseError => {
        this.message = "Something Went Wrong";
      },
      () => console.log("Get Article Executed!")
    )
  }

}
function getCategoryName(id: number): string {
  switch (id) {
    case 1:
      return "Entertainment";
    case 2:
      return "Sports";
    case 3:
      return "Politics";
    case 4:
      return "Education";
    case 5:
      return "Bussiness";
  }
  return "Bussiness";
}
