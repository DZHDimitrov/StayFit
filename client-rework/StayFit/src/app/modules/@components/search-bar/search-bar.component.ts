import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { FoodsService } from '../../@core/backend/services/foods.service';
import { IFoodKeywordAutocomplete } from '../../@core/interfaces/foods/foods-keywords.interface';
import { loadAutocompleteKeywords } from '../../@pages/foods/store/foods.actions';
import { getAutocompleteKeywords } from '../../@pages/foods/store/foods.selector';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(private store: Store<IAppState>,private service:FoodsService,private router:Router) {}

  searchedFood$!: Observable<IFoodKeywordAutocomplete[]>;
  searchText!: string;
  search$: Subject<string> = new Subject();

  search(ev: any): void {
    this.store.dispatch(loadAutocompleteKeywords({ searchedFood: '' }));
    this.searchText = ev.value;
    this.search$.next(ev.value);
  }

  ngOnInit(): void {
    this.searchedFood$ = this.search$.pipe(
      debounceTime(1200),
      switchMap((searchedFood) => {
        if (searchedFood) {
          this.store.dispatch(loadAutocompleteKeywords({ searchedFood }));
          return this.store.select(getAutocompleteKeywords);
        }
        return of([]);
      })
    );
  }
  autocomplete(ev:any) {
    console.log(ev);
    this.searchText = ev.option.value;
  }

  test() {
    this.router.navigate(['/','pages','foods'],{queryParams:{search:this.searchText}})
  } 
}
