import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import {
  filter,
  shareReplay,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { FoodDetailsMode } from '../interfaces/food.interface';
import { loadFoodById, setFoodDetailsMode } from '../store/foods.actions';
import { getFoodDetails, getFoodDetailsMode } from '../store/foods.selector';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
})
export class FoodDetailsComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}
  // ngOnDestroy(): void {
  //   this.store.dispatch(setFoodDetailsMode({mode:FoodDetailsMode.VIEW}));
  // }
  foodDetails!: any;
  unsubscribe$: Subject<void> = new Subject();
  mode$!: Observable<FoodDetailsMode>;

  ngOnInit(): void {
    this.mode$ = this.store.select(getFoodDetailsMode).pipe(filter(mode => mode !== undefined));
    
    this.store
      .select(getRouterState)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((route) => {
          const foodId = route.state.params['id'];
          this.store.dispatch(loadFoodById({ id: foodId }));
          return this.store.select(getFoodDetails);
        })
      )
      .subscribe({
        next: (foodDetails) => {
          this.foodDetails = foodDetails;
        },
      });
  }

  switchMode(mode:string) {
    if (mode === FoodDetailsMode.EDIT) {
      this.store.dispatch(setFoodDetailsMode({mode:FoodDetailsMode.EDIT}))
    }
  }
}
