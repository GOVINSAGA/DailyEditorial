import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { IJournalistArticle } from '../dailybytes-interfaces/journalist-article';

@Component({
  selector: 'app-journalist-article',
  templateUrl: './journalist-article.component.html',
  styleUrls: ['./journalist-article.component.css']
})
export class JournalistArticleComponent implements OnInit {
  articles: IJournalistArticle[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  journalistId: number = 0;
  userName: string = '';

  constructor(
    private readonly _articleService: ArticleService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.journalistId = Number(sessionStorage.getItem('userId'));
    this.userName = sessionStorage.getItem('userName') || '';
    
    if (!this.journalistId) {
      this.errorMessage = 'User not logged in';
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadJournalistArticles();
  }

  loadJournalistArticles(): void {
    this.isLoading = true;
    this._articleService.getJournalistArticles(this.journalistId).subscribe({
      next: (data) => {
        this.articles = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load articles. Please try again.';
        this.isLoading = false;
        console.error('Error loading articles:', error);
      },
      complete: () => {
        console.log('Journalist articles loaded successfully');
      }
    });
  }

  editArticle(articleId: number): void {
    this.router.navigate(['/edit-article', articleId]);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  isEditDisabled(status: string): boolean {
    return status.toLowerCase() === 'published';
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'status-draft';
      case 'submitted':
        return 'status-submitted';
      case 'published':
        return 'status-published';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  }
}
