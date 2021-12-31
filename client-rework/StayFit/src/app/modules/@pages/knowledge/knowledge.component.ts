import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { ICategoryReadingPreviewData } from './interfaces/reading.interface';
import { loadCategoriesLatestPreviews } from './store/knowledge.actions';
import { getLatestPreviews } from './store/knowledge.selector';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent implements OnInit, OnDestroy {
  readingsByMainCategory$!: Observable<ICategoryReadingPreviewData[]>;
  currentRoute!: string[];
  unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategoriesLatestPreviews());
    this.readingsByMainCategory$ = this.store.select(getLatestPreviews);
    this.store
      .select(getRouterState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((route) => {
        this.currentRoute = route.state.url
          .split('/')
          .filter((segment) => segment !== '');
      });
  }

  navigate(preview: any): void {
    if (preview.name.includes('състав')) {
      this.router.navigate(['/', 'pages', 'foods']);
      return;
    }
    if (preview.hasChildren) {
      this.router.navigate([
        '/',
        'pages',
        'knowledge',
        preview.mainCategoryName,
        preview.searchName,
      ]);
    } else {
      this.router.navigate([
        '/',
        'pages',
        'knowledge',
        preview.mainCategoryName,
        preview.searchName,
      ]);
    }
  }
}
