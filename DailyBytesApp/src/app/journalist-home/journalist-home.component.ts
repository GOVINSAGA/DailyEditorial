import { Component ,OnInit} from '@angular/core';
import { IArticle } from '../dailybytes-interfaces/article';
import { ArticleService } from '../dailybytes-services/article-service/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journalist-home',
  templateUrl: './journalist-home.component.html',
  styleUrls: ['./journalist-home.component.css']
})
export class JournalistHomeComponent implements OnInit {

  articlesList: IArticle[] = [];

  constructor(private readonly articleService: ArticleService, private readonly router: Router) {

  }
  ngOnInit() {
    this.articleService.getPublishedArticles().subscribe(res => {
      this.articlesList = res;
    });
  }
  openArticle(id: number) {
    this.router.navigate(['/read-article', id])
  }

}
