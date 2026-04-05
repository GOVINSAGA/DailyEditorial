import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from '../../dailybytes-interfaces/article';
import { Observable, catchError, throwError } from 'rxjs';
import { IEditor } from '../../dailybytes-interfaces/editor';
import { IMedia } from '../../dailybytes-interfaces/media';
import { IJournalistArticle } from '../../dailybytes-interfaces/journalist-article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: IArticle[] = [];

  constructor(private readonly http: HttpClient) { }

  getPublishedArticles(): Observable<IArticle[]> {
    let tempvar = this.http.get<IArticle[]>('https://localhost:7195/api/Articles/GetPublishedArticles').pipe(catchError(this.errorHandler));
    return tempvar;
  }

  getArticlesById(articleId:number): Observable<IArticle> {
    let tempvar = this.http.get<IArticle>('https://localhost:7195/api/Articles/GetArticlesById?id='+articleId).pipe(catchError(this.errorHandler));
    return tempvar;
  }

  getArticlesByEditorId(editorId: number): Observable<IArticle[]> {
    return this.http.get<IArticle[]>('https://localhost:7195/api/Articles/GetArticlesByEditorId?editorId=' + editorId)
      .pipe(catchError(this.errorHandler));
  }

  getJournalistArticles(journalistId: number): Observable<IJournalistArticle[]> {
    return this.http.get<IJournalistArticle[]>('https://localhost:7195/api/Articles/GetJournalistArticles?journalistId=' + journalistId)
      .pipe(catchError(this.errorHandler));
  }

  authorArticles(articleObj: Partial<IArticle>): Observable<number> {
    return this.http.post<number>('https://localhost:7195/api/Articles/AuthorArticle', articleObj).pipe(catchError(this.errorHandler));
  }

  sendFeedback(articleId: number, feedback: string): Observable<boolean> {
    const body = {
      articleId,
      feedback
    }
    return this.http.put<boolean>('https://localhost:7195/api/Articles/AddFeedback', body)
      .pipe(catchError(this.errorHandler));
  }

  sendArticleForReview(articleId: number, authorId: number, editorId: number): Observable<boolean> {
    const url = 'https://localhost:7195/api/Articles/SendArticleForReview';
    const params = {
      articleId: articleId,
      authorId: authorId,
      editorId: editorId
    }
    return this.http.post<boolean>(url, null, { params })
      .pipe(catchError(this.errorHandler)); 
  }

  publishArticle(articleId: number): Observable<boolean> {
    const body = {
      articleId
    }
    return this.http.put<boolean>('https://localhost:7195/api/Articles/PublishArticle', body)
      .pipe(catchError(this.errorHandler));
  }

  GetEditors(): Observable<IEditor[]> {
    let tempvar = this.http.get<IEditor[]>('https://localhost:7195/api/Articles/GetEditors').pipe(catchError(this.errorHandler));
    return tempvar;
  }

  GetMedia(): Observable<IMedia[]> {
    let tempvar = this.http.get<IMedia[]>('https://localhost:7195/api/Articles/GetMedia').pipe(catchError(this.errorHandler));
    return tempvar;
  }

  //create a service method to archive an article
  archiveArticle(articleId: number): Observable<boolean> {
    return this.http.put<boolean>(`https://localhost:7195/api/Articles/ArchiveArticle?articleId=${articleId}`, {})
      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Server Error');
  }

}
