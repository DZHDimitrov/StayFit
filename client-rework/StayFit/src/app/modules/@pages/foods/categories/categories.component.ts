import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IFoodCategory } from 'src/app/modules/@core/interfaces/responses/foods/foods.res';
import { IAppState } from 'src/app/state/app.state';
import { loadFoodsCategories, loadSearchedFood } from '../store/foods.actions';
import { getFoodsCategories, getSearchedFoods } from '../store/foods.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private store: Store<IAppState>,private router:ActivatedRoute) {}

  foodCategories$!: Observable<IFoodCategory[]>;
  search$: Subject<string> = new Subject();
  searchedFood$!: Observable<
    { id: number; foodNameId: number; searchName: string }[]
  >;

  ngOnInit(): void {
    this.store.dispatch(loadFoodsCategories());
    this.foodCategories$ = this.store.select(getFoodsCategories);
    this.searchedFood$ = this.search$.pipe(
      debounceTime(1200),
      switchMap((searchedFood) => {
        this.store.dispatch(loadSearchedFood({ searchedFood }));
        if (searchedFood) {
          return this.store.select(getSearchedFoods);
        }
        return of([]);
      })
    );
  }

  search(ev: any): void {
    this.search$.next(ev.value);
  }

  navigate(category:any) {
    console.log(category);
  }
}
