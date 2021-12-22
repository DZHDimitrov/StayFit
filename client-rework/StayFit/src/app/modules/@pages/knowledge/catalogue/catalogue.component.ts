import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { loadCategoriesLatestPreviews } from '../store/knowledge.actions';
import { getCatalogue, getLatestPreviews } from '../store/knowledge.selector';
import { CatalogueService } from '../services/catalogue.service';
import { ReadingCategory } from '../../../@core/enums/reading.category';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  catalogue$!: Observable<any>;
  unsubscribe$: Subject<void> = new Subject();
  currentRoute!: Array<string>;
  constructor(
    private store: Store<IAppState>,
    private service: CatalogueService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((route) => {
          this.currentRoute = route.state.url
            .split('/')
            .filter((x) => x !== '');
          const action: any = this.service.catalogueDispatcher(
            ['pages','knowledge'],
            route.state.url
          );
          this.store.dispatch(action);
          return this.store.select(getLatestPreviews);
        }),
        tap((x) => {
          if (x.length === 0) {
            this.store.dispatch(loadCategoriesLatestPreviews());
          }
          this.catalogue$ = this.store.select(getCatalogue);
        })
      )
      .subscribe();
  }

  navigate(a: any) {
    if (a.hasChildren || a.mainCategoryName == ReadingCategory.Articles) {
      this.router.navigate([...this.currentRoute, a.searchName]);
    } else {
      this.router.navigate([...this.currentRoute, a.id]);
    }
  }
}
