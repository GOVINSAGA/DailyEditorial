import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IArticle } from '../dailybytes-interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css']
})
export class SearchArticleComponent implements OnInit {
  articlesList: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  userName = sessionStorage.getItem('userName');
  constructor(private readonly _articleService: ArticleService, private readonly router: Router) { }

  ngOnInit() {
    this.getAllPublishedArticles();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  getAllPublishedArticles() {
    this._articleService.getPublishedArticles().subscribe(
      responseData => {
        this.articlesList = responseData;
      },
      responseError => {
        console.log("Some error occurred");
      },
      () => console.log("Executed")
    )
  }
  search(keyword: string) {
    this.filteredArticles = this.searchArticleByKeyword(this.articlesList, keyword);
    this.filteredArticles.forEach(art => {
      console.log(art);
    })
  }

  searchArticleByKeyword(
    articles: IArticle[],
    keyword: string
  ): IArticle[] {

    if (!keyword || keyword.trim() === '') {
      return [];
    }

    const searchKey = keyword.toLowerCase();

    return articles.filter(article =>
      article.headline?.toLowerCase().includes(searchKey) ||
      article.subHeading?.toLocaleLowerCase().includes(searchKey) ||
      article.articleContent?.toLowerCase().includes(searchKey)
    );
  }
}

