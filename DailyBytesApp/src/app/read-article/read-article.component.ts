import { Component, OnInit } from '@angular/core';
import { IArticle } from '../dailybytes-interfaces/article';
import { Router, ActivatedRoute} from '@angular/router';
import { ArticleService } from '../dailybytes-services/article-service/article.service';

@Component({
  selector: 'app-read-article',
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.css']
})
export class ReadArticleComponent implements OnInit {

  articleDetails!: IArticle;
  errMsg: string = "";
  userRole: string = "";
  userName: string = "";
  roleId: number = 0;
  authorName: string = "";
  isLoggedIn: boolean = false;
  constructor(private readonly _articleService: ArticleService,
    private readonly router: Router, private  readonly route: ActivatedRoute) {
    let userEmail = sessionStorage.getItem("userName");
    if (userEmail) {
      this.isLoggedIn = true;
      this.userName = userEmail.split("@")[0];
    }  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.params['id'])
    this.getArticles(id);

    this.userRole = <string>sessionStorage.getItem('userRole');
    this.userName = <string>sessionStorage.getItem('userName');
    this.roleId = Number(sessionStorage.getItem('roleId'));
  }

  getArticles(id: number) {
    this._articleService.getArticlesById(id).subscribe(
      responseData => {
        this.articleDetails = responseData;
      },
      responseError => {
        this.errMsg = responseError;
        console.log(this.errMsg);
      },
      () => console.log("GetArticleDetails Executed Successfully")

    );

  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  

}
