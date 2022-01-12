import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import {
  loadFoodsByCategory,
  loadFoodCategories,
  loadNutrients,
  setChosenNutrients,
} from '../store/admin.actions';
import {
  getChosenNutrients,
  getFoodCategories,
  getFoodsByCategory,
  getNutrients,
} from '../store/admin.selector';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.scss'],
})
export class NewFoodComponent implements OnInit {
  foodForm!: FormGroup;
  foodCategories$!: Observable<{ id: number; name: string }[]>;
  foodsByCategory$!: Observable<any[]>;
  foodNutrients$!: Observable<any>;
  chosenNutrients$!: Observable<any>;
  constructor(private store: Store<IAppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.foodForm = this.fb.group({});
    this.store.dispatch(loadFoodCategories());
    this.foodCategories$ = this.store.select(getFoodCategories);
    this.foodsByCategory$ = this.store
      .select(getFoodsByCategory)
      .pipe(shareReplay(1));
    this.foodNutrients$ = this.store.select(getNutrients).pipe(
      shareReplay(1),
      filter((n) => n.length > 0),
      tap((n) => {
        this.foodForm = this.fb.group(
          n.reduce((acc, curr) => {
            acc[curr.id] = this.fb.group(
              curr.subNutrients.reduce((acc, curr) => {
                acc[curr.id] = [''];
                return acc;
              }, {})
            );
            return acc;
          }, {})
        );
      })
    );
    this.chosenNutrients$ = this.store.select(getChosenNutrients);
  }

  loadFoodsCategories(ev: any) {
    const foodId = ev.value;
    this.store.dispatch(loadFoodsByCategory({ categoryName: foodId }));
  }

  loadNutrients() {
    this.store.dispatch(loadNutrients());
  }

  selectNutrient(
    baseId: number,
    baseName: string,
    subNutrientId: number,
    subNutrientName: string
  ) {
    this.store.dispatch(
      setChosenNutrients({
        nutrient: {
          id: baseId,
          name: baseName,
          subNutrientId,
          subNutrientName,
        },
      })
    );
  }
}
