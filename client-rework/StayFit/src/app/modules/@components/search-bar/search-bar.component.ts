import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { loadSearchedFood } from '../../@pages/foods/store/foods.actions';
import { getSearchedFoods } from '../../@pages/foods/store/foods.selector';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  searchedFood$!: Observable<
    { id: number; foodNameId: number; searchName: string }[]
  >;

  search$: Subject<string> = new Subject();

  search(ev: any): void {
    this.store.dispatch(loadSearchedFood({ searchedFood: '' }));
    this.search$.next(ev.value);
  }

  ngOnInit(): void {
    this.searchedFood$ = this.search$.pipe(
      debounceTime(1200),
      switchMap((searchedFood) => {
        if (searchedFood) {
          this.store.dispatch(loadSearchedFood({ searchedFood }));
          return this.store.select(getSearchedFoods);
        }
        return of([]);
      })
    );
  }
}
