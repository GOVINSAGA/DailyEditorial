import { Component, OnInit } from '@angular/core';
import { IArticle } from '../dailybytes-interfaces/article';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { Router } from '@angular/router';
import { IEditor } from '../dailybytes-interfaces/editor';
import { IMedia } from '../dailybytes-interfaces/media';

@Component({
  selector: 'app-author-article',
  templateUrl: './author-article.component.html',
  styleUrls: ['./author-article.component.css']
})
export class AuthorArticleComponent implements OnInit{

  article: Partial<IArticle> = {
    headline: '',
    subHeading: '',
    articleContent: '',
    categoryId: 0,
    editorId: 0,
    authorId: 0,
    mediaId: 0
  };

  articleId: number = 0 ;
  showSendForReviewBtn = false;

  categories = [
    { categoryId: 1, categoryName: 'Sports' },
    { categoryId: 2, categoryName: 'Politics' },
    { categoryId: 3, categoryName: 'Entertainment' },
    { categoryId: 4, categoryName: 'Technology' },
    { categoryId: 5, categoryName: 'Health' }
  ];

  editors: IEditor[] = [];
  
  mediaList = [
    { mediaId: 1, mediaName: 'Image' },
    { mediaId: 2, mediaName: 'Video' },
    { mediaId: 3, mediaName: 'Audio' },
    { mediaId: 4, mediaName: 'Text' } 
  ];

  constructor(private readonly _articleService: ArticleService, private readonly router: Router) { }

  ngOnInit(): void {
    console.log('Author Article Component Implemented.');
    this.article.authorId = Number(sessionStorage.getItem('userId'));
    this.loadEditors();
    this.loadMedia();
  }

  submitArticle(form: NgForm) {
    if (form.invalid) {
      alert('Please fill all required forms');
      return;
    }
    this.article.authorId = Number(sessionStorage.getItem('userId'));
    console.log("Final Article Payload: ", this.article);

    this._articleService.authorArticles(this.article).subscribe({
      next: (res: number) => {
        if (res > 0) {
          this.articleId = res;
          console.log("response:" + res);
          console.log("Response Payload: ", this.article);
          alert('Article Saved');
        } else {
          console.log("Error Payload: ", this.article);
          console.log("response:" + res);
          alert('Article Save Failed');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Server Error');
      }
    });
  }

  sendForReview() {
    if (!this.articleId) {
      alert('Please save article before sending for review');
    }

    const authorId = Number(sessionStorage.getItem('userId'));
    const editorId = Number(this.article.editorId);

    this._articleService.sendArticleForReview(this.articleId, authorId, editorId).subscribe(
      (res) => {
        if (res) {
          alert('Article sent for review successfully');
          this.router.navigate(['/journalist'])
        } else {
          alert('Failed to send article for review');
        }
      },
      (error) => {
        console.error('Send for review error', error);
        alert('Something went wrong')
      },
      () => console.log('SendForReview method executed successfully')

    )
  }

  loadEditors(): void {
    this._articleService.GetEditors().subscribe({
      next: (data) => {
        this.editors = data;
        console.log("Editors Loaded", data);
      },
      error: (err) => {
        console.error("Error Loading Editors", err);
      }
    });
  }

  loadMedia(): void {
    this._articleService.GetMedia().subscribe({
      next: (data) => {
        this.mediaList = data;
        console.log("Media Loaded", data);
      },
      error: (err) => {
        console.error("Error Loading Media", err);
      }
    });
  }

  backToHome() {
    this.router.navigate(['/journalist']);
  }
}
