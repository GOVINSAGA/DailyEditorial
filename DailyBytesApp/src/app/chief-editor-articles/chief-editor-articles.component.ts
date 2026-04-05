import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chief-editor-articles',
  templateUrl: './chief-editor-articles.component.html',
  styleUrls: ['./chief-editor-articles.component.css']
})
export class ChiefEditorArticlesComponent implements OnInit {

  articles: any[] = [];
  userName = sessionStorage.getItem('userName');
  constructor(private readonly articleService: ArticleService, private readonly router: Router) { }

  ngOnInit() {
    this.articleService.getPublishedArticles().subscribe({
      next: (res) => {
        this.articles = res;
      },
      error: (err) => {
        console.error('Error fetching published articles', err);
      }
    });
  }

  //create a method to archive an article
  archiveArticle(articleId: number) {
    this.articleService.archiveArticle(articleId).subscribe({
      next: (res) => {
        alert('Article archived successfully');
        this.ngOnInit(); // Refresh the list of articles
      },
      error: (err) => {
        alert('Some error occured');
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
