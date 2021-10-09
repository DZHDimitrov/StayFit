import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { IRecentArticle } from 'src/app/shared/interfaces/Articles/Article';
import { ArticlesService } from '../../services/articles-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  unsubscribe$ = new Subject<void>();
  recentArticles: IRecentArticle[] | undefined;
  isLoading: boolean = true;

  get isLoadingArticles(): boolean {
    return this.isLoading;
  }

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.articlesService.getRecentArticles().pipe(
      takeUntil(this.unsubscribe$),
      finalize(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      }),
      catchError((err) => of([]))
    ).subscribe(recentArticles=> {
      this.recentArticles = recentArticles;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log(this.isLoading)
  }

}
