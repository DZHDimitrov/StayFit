import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { IFoodCategoryData } from '../interfaces/food.interface';
import { loadFoodsCategories, loadSearchedFood } from '../store/foods.actions';
import { getFoodsCategories, getSearchedFood } from '../store/foods.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  foodCategories$!: Observable<IFoodCategoryData[]>;
  searchedFood$!: Observable<any[]>;
  unsubscribe$: Subject<void> = new Subject();
  searchErrorMsg!: string | null;

  ngOnInit(): void {
    this.store.dispatch(loadFoodsCategories());
    this.foodCategories$ = this.store.select(getFoodsCategories);
    this.searchedFood$ = this.store.select(getRouterState).pipe(
      takeUntil(this.unsubscribe$),
      shareReplay(1),
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
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
