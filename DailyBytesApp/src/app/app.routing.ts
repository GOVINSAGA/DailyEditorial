import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ReadArticleComponent } from './read-article/read-article.component';
import { SearchArticleComponent } from './search-article/search-article.component';
import { ReviewArticlesComponent } from './review-articles/review-articles.component';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { JournalistHomeComponent } from './journalist-home/journalist-home.component';
import { AuthorArticleComponent } from './author-article/author-article.component';
import { ViewArticlesEditorComponent } from './view-articles-editor/view-articles-editor.component';
import { ChiefEditorArticlesComponent } from './chief-editor-articles/chief-editor-articles.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { JournalistArticleComponent } from './journalist-article/journalist-article.component';
import { MembershipComponent } from './membership/membership.component';
import { PremiumAccessComponent } from './premium-access/premium-access.component';


const route: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-article', component: ViewArticleComponent },
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'read-article/:id', component: ReadArticleComponent },
  { path: 'search-article', component: SearchArticleComponent },
  { path: 'review', component: ViewArticlesEditorComponent },
  { path: 'review/:articleId', component: ReviewArticlesComponent },
  { path: 'journalist', component: JournalistHomeComponent },
  { path: 'editor', component: EditorLayoutComponent },
  { path: 'author-article', component: AuthorArticleComponent },
  { path: 'my-articles', component: JournalistArticleComponent },
  { path: 'chief-editor/articles', component: ChiefEditorArticlesComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'premium-access', component: PremiumAccessComponent },
  { path: '**', component: LandingComponent }
]

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(route);
