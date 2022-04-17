import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, of, Subject } from 'rxjs';

import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { IFoodCategoryNavigate } from '../models/foods-category.model';

import { loadFoodsCategories, loadSearchedFood } from '../store/foods.actions';

import {
  getFoodsCategoriesWithNavigation,
  getSearchedFood,
} from '../store/foods.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  unsubscribe$: Subject<void> = new Subject();
  foodCategories$!: Observable<IFoodCategoryNavigate[]>;
  searchedFood$!: Observable<any[]>;

  searchErrorMsg!: string | null;

  ngOnInit(): void {
    this.store.dispatch(loadFoodsCategories());

    this.foodCategories$ = this.store.select(getFoodsCategoriesWithNavigation);
    
    this.searchedFood$ = this.store.select(getRouterState).pipe(
      takeUntil(this.unsubscribe$),
      switchMap((route) => {
        if (route.state.queryParams['search']) {
          this.store.dispatch(
            loadSearchedFood({ text: route.state.queryParams['search'] })
          );
          return this.store.select(getSearchedFood).pipe(
            map((f) => {
              if (f.length === 0) {
                this.searchErrorMsg = 'Няма намерени резултати от търсенето';
              } else {
                this.searchErrorMsg = null;
              }
              return f;
            })
          );
        }
        return of([]);
      }),
      shareReplay()
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
