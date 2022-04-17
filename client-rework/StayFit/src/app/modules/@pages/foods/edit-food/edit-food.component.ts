import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { FoodDetailsMode } from '../models/foods-food.model';

import { INutrient } from '../models/foods-nutrients.model';

import { editFoodById, setFoodDetailsMode } from '../store/foods.actions';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss'],
})
export class EditFoodComponent implements OnInit {
  @Input() coreNutrients!: INutrient[];
  @Input() allNutrients!: INutrient[];
  @Input() foodDetails!: any;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {}

  editFoodForm!: FormGroup;

  editDetails!: any;
  foodId!: number;

  ngOnInit(): void {
    this.store.select(getRouterState).subscribe((route) => {
      const foodId = route.state.params['id'];
      this.foodId = foodId;
    });

    this.filterEmptyInputs();
    this.initEditForm();
  }

  save() {
    if (this.editFoodForm.pristine) {
      this.store.dispatch(setFoodDetailsMode({ mode: FoodDetailsMode.VIEW }));
      return;
    }

    const data: any = this.gatherEditFormData();

    this.store.dispatch(editFoodById({ foodId: this.foodId, data }));
  }

  gatherEditFormData() {
    const nutrients: any = this.editFoodForm.get('nutrients')?.value;
    const subNutrients: any = this.editFoodForm.get('subNutrients')?.value;

    return {
      calories: this.editFoodForm.get('calories')?.value,
      nutrients: Object.keys(nutrients)
        .filter((key) => nutrients[key] !== '')
        .map((key) => {
          return {
            id: key,
            quantity: nutrients[key] ?? null,
          };
        }),
      subNutrients: Object.keys(subNutrients)
        .filter((key) => subNutrients[key] !== '')
        .map((key) => {
          return {
            id: key,
            quantity: subNutrients[key] ?? null,
          };
        }),
    };
  }

  back() {
    this.store.dispatch(setFoodDetailsMode({ mode: FoodDetailsMode.VIEW }));
  }

  initEditForm() {
    this.editFoodForm = this.fb.group({
      calories: [this.editDetails.calories],
      nutrients: this.fb.group(
        this.coreNutrients.reduce((acc, curr) => {
          acc[curr.id] = [curr.quantity];
          return acc;
        }, {})
      ),
      subNutrients: this.fb.group(
        this.allNutrients
          .map((x) => x.subNutrients)
          .reduce((acc, curr) => {
            acc.push(...curr);
            return acc;
          }, [])
          .reduce((acc, curr) => {
            acc[curr.id] = [curr.quantity];
            return acc;
          }, {})
      ),
    });
  }

  filterEmptyInputs() {
    this.editDetails = {
      ...this.foodDetails,
      nutrients: this.foodDetails.nutrients.map((nutrient) => {
        return {
          ...nutrient,
          subNutrients: nutrient.subNutrients.map((subNutrient) => {
            return {
              ...subNutrient,
              quantity:
                subNutrient.quantity === 'Няма данни'
                  ? ''
                  : subNutrient.quantity,
            };
          }),
        };
      }),
    };
  }
}
