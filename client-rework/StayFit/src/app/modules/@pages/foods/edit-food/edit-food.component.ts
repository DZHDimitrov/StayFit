import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { loadFoodById } from '../store/foods.actions';
import { getFoodDetails } from '../store/foods.selector';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss'],
})
export class EditFoodComponent implements OnInit {
  @Input() foodDetails!: any;
  editDetails!: any;

  editFoodForm!: FormGroup;
  chosenNutrients!: Observable<any>;
  foodId!:number;

  constructor(private fb: FormBuilder, private store: Store<IAppState>,private service:FoodsService) {}

  ngOnInit(): void {
    this.store.select(getRouterState).subscribe(route => {
      const foodId = route.state.params['id'];
      this.foodId = foodId;
    })

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

    this.editFoodForm = this.fb.group({
      calories: [this.editDetails.calories],
      nutrients: this.fb.group(
        this.editDetails.coreNutrients.reduce((acc, curr) => {
          acc[curr.id] = [curr.quantity];
          return acc;
        }, {})
      ),
      subNutrients: this.fb.group(
        this.editDetails.nutrients
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

  save() {
    const data = this.gatherData();
    console.log(data);
    this.service.edit(this.foodId,data).subscribe();
  }

  gatherData() {
    const nutrients: any = this.editFoodForm.get('nutrients')?.value;
    const subNutrients: any = this.editFoodForm.get('subNutrients')?.value;
    return {
      calories: this.editFoodForm.get('calories')?.value,
      nutrients: Object.keys(nutrients)
        .filter((key) => nutrients[key] !== '')
        .map((key) => {
          return {
            id: key,
            quantity: +nutrients[key],
          };
        }),
      subNutrients: Object.keys(subNutrients)
        .filter((key) => subNutrients[key] !== '')
        .map((key) => {
          return {
            id: key,
            quantity: +subNutrients[key],
          };
        }),
    };
  }
}
