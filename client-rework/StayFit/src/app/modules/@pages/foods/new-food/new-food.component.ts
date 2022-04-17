import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { shareReplay } from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

import { IFoodCategory } from '../models/foods-category.model';

import { IFoodType } from '../models/foods-types.model';

import {
  addFood,
  loadFoodsCategories,
  loadFoodTypesByCategoryId,
} from '../store/foods.actions';

import {
  getFoodCategoriesSelection,
  getFoodTypesByCategory,
} from '../store/foods.selector';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.scss'],
})
export class NewFoodComponent implements OnInit {
  foodForm!: FormGroup;
  foodCategories$!: Observable<Partial<IFoodCategory>[]>;
  foodTypes$!: Observable<IFoodType[]>;

  constructor(private store: Store<IAppState>, private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.store.dispatch(loadFoodsCategories({}));
    this.foodCategories$ = this.store.select(getFoodCategoriesSelection);
    this.foodTypes$ = this.store
      .select(getFoodTypesByCategory)
      .pipe(shareReplay(1));
  }

  loadFoodTypes(ev: any) {
    const foodId = ev.value;
    this.store.dispatch(loadFoodTypesByCategoryId({ categoryId: foodId }));
  }

  createFood() {
    const formData: any = this.getFormData();

    this.store.dispatch(addFood({ data: formData }));
  }

  fileChange(files: FileList | null) {
    if (files && files[0].size > 0) {
      this.foodForm.patchValue({
        image: files[0],
      });
    }
  }

  private getFormData(): FormData {
    const formModel = this.foodForm.value;

    let formData = new FormData();
    Object.keys(formModel).forEach((key: any) => {
      let valueToAppend = this.foodForm.get(key)?.value;
      formData.append(key, valueToAppend);
    });
    return formData;
  }

  private initForm() {
    this.foodForm = this.fb.group({
      foodCategoryId: ['', Validators.required],
      foodTypeId: ['', Validators.required],
      calories: ['', Validators.required],
      description: [''],
      image: ['', Validators.required],
    });
  }
}
