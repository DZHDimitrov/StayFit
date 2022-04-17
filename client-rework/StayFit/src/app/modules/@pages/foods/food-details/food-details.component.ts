import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import {
  filter,
  map,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { getUser } from 'src/app/modules/@auth/state/auth.selector';
import { Roles } from 'src/app/modules/@core/enums/roles';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { FoodDetailsMode } from '../models/foods-food.model';

import { INutrient } from '../models/foods-nutrients.model';

import { deleteFood, loadFoodById, setFoodDetailsMode } from '../store/foods.actions';

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
  hasPrivilegeToEdit:boolean = false;
  hasPrivilegeToDelete:boolean = false;

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
          if(foodId) {
            this.store.dispatch(loadFoodById({ id: foodId }));
          }
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

    this.store.select(getUser).pipe(take(1)).subscribe(user => {
      this.hasPrivilegeToEdit = (user?.hasRole(Roles.ADMINISTRATOR) || user?.hasRole(Roles.MODERATOR)) ?? false;
      this.hasPrivilegeToDelete = user?.hasRole(Roles.ADMINISTRATOR) ?? false;
    })
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

  deleteFood(foodId:number){
    this.store.dispatch(deleteFood({foodId:foodId.toString()}))
  }
}
