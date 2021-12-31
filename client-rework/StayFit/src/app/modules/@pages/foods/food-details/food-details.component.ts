import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { loadFoodById } from '../store/foods.actions';
import { getFoodDetails } from '../store/foods.selector';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
})
export class FoodDetailsComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}
  foodDetails!: any;
  unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
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
}
