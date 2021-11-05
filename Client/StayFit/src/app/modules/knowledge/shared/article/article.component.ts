import { Component, Input, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { IRecentArticle } from 'src/app/shared/interfaces/Articles/Article';
import { ArticlesService } from '../../services/articles-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() recentArticles!: IRecentArticle[];

  unsubscribe$ = new Subject<void>();
  //recentArticles: IRecentArticle[] | undefined;
  //isLoading: boolean = true;

  // get isLoadingArticles(): boolean {
  //   return this.isLoading;
  // }

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  test() {
    console.log(this.recentArticles);
  }
}
