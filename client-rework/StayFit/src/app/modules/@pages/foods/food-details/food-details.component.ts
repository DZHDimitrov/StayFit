import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import {
  filter,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { FoodDetailsMode } from 'src/app/modules/@core/interfaces/foods/foods-food.interface';
import { INutrient } from 'src/app/modules/@core/interfaces/foods/foods-nutrients.interface';
// import { FoodDetailsMode } from 'src/app/modules/@core/interfaces/responses/foods/foods.res';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { loadFoodById, setFoodDetailsMode } from '../store/foods.actions';
import {
  getAllNutrients,
  getCoreNutrients,
  getFoodDetails,
  getFoodDetailsMode,
} from '../store/foods.selector';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
})
export class FoodDetailsComponent implements OnInit,OnDestroy {

  constructor(private store: Store<IAppState>) {}

  unsubscribe$: Subject<void> = new Subject();

  foodDetails!: any;
  mode$!: Observable<FoodDetailsMode>;
  coreNutrients!: INutrient[];
  allNutrients!: INutrient[];

  ngOnInit(): void {
    this.mode$ = this.store
      .select(getFoodDetailsMode)
      .pipe(filter((x) => x !== undefined));

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

    this.store
      .select(getCoreNutrients)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (coreNutrients) => {
          this.coreNutrients = coreNutrients;
        },
      });

    this.store
      .select(getAllNutrients)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (allNutrients) => {
          this.allNutrients = allNutrients;
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.store.dispatch(setFoodDetailsMode({ mode: FoodDetailsMode.VIEW }));
  }

  switchMode(mode: string) {
    if (mode === FoodDetailsMode.EDIT) {
      this.store.dispatch(setFoodDetailsMode({ mode: FoodDetailsMode.EDIT }));
    }
  }
}
