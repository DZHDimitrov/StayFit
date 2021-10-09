import { Component, OnInit } from '@angular/core';
import { ApiMethod } from 'src/app/core/services/conts';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IRecentArticle } from 'src/app/shared/interfaces/Articles/Article';
import { ArticlesService } from '../../../services/articles-service.service';

@Component({
  selector: 'app-paginated-articles',
  templateUrl: './paginated-articles.component.html',
  styleUrls: ['./paginated-articles.component.scss']
})
export class PaginatedArticlesComponent implements OnInit {

  heading: string = "Статии"
  articles: IRecentArticle[] | undefined;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAllArticlesOnPage().subscribe(articles => this.articles = articles);
  }
}
