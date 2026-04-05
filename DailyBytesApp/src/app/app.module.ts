import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { SearchArticleComponent } from './search-article/search-article.component';
import { ReadArticleComponent } from './read-article/read-article.component';
import { ReviewArticlesComponent } from './review-articles/review-articles.component';
import { JournalistLayoutComponent } from './journalist-layout/journalist-layout.component';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { JournalistHomeComponent } from './journalist-home/journalist-home.component';
import { AuthorArticleComponent } from './author-article/author-article.component';
import { ViewArticlesEditorComponent } from './view-articles-editor/view-articles-editor.component';
import { ChiefEditorArticlesComponent } from './chief-editor-articles/chief-editor-articles.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { JournalistArticleComponent } from './journalist-article/journalist-article.component';
import { MembershipComponent } from './membership/membership.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    SearchArticleComponent,
    ReadArticleComponent,
    ReviewArticlesComponent,
    JournalistLayoutComponent,
    EditorLayoutComponent,
    CommonLayoutComponent,
    JournalistHomeComponent,
    AuthorArticleComponent,
    ViewArticlesEditorComponent,
    ChiefEditorArticlesComponent,
    ViewProfileComponent,
    ChiefEditorArticlesComponent,
    JournalistArticleComponent,
    ChiefEditorArticlesComponent,
    MembershipComponent
  ],
  imports: [
    BrowserModule, FormsModule, routing, HttpClientModule, RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
