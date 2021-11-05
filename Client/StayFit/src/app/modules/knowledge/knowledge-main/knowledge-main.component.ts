import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { IRecentArticle } from 'src/app/shared/interfaces/Articles/Article';
import { ArticlesService } from '../services/articles-service.service';

@Component({
  selector: 'app-knowledge-main',
  templateUrl: './knowledge-main.component.html',
  styleUrls: ['./knowledge-main.component.scss']
})
export class KnowledgeMainComponent implements OnInit {

  isLoading!: boolean;
  unsubscribe$: Subject<void> = new Subject();
  recentArticles!: IRecentArticle[];
  constructor(private articlesService:ArticlesService) { }

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

}
