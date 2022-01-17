import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  shareReplay} from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { FoodsService } from '../../../@core/backend/services/foods.service';
import { loadFoodCategories, loadFoodsCategories, loadFoodTypesByCategoryId, loadNutrients, setChosenNutrients } from '../store/foods.actions';
import { getFoodCategories, getFoodsByCategory, getFoodTypesByCategory } from '../store/foods.selector';


@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.scss'],
})
export class NewFoodComponent implements OnInit {
  foodForm!: FormGroup;
  foodCategories$!: Observable<{ id: number; name: string }[]>;
  foodTypes$!: Observable<any[]>;
  foodNutrients$!: Observable<any>;
  chosenNutrients$!: Observable<any>;
  constructor(private store: Store<IAppState>, private fb: FormBuilder,private service:FoodsService) {}

  ngOnInit(): void {
    console.log('test')
    // this.foodForm = this.fb.group({});
    this.foodForm = this.fb.group({
      foodCategoryId:['',Validators.required],
      foodNameId:['',Validators.required],
      calories:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required]
    })

    this.store.dispatch(loadFoodCategories());
    this.foodCategories$ = this.store.select(getFoodCategories);
    this.foodTypes$ = this.store
      .select(getFoodTypesByCategory)
      .pipe(shareReplay(1));
  }

  loadFoodTypes(ev: any) {
    const foodId = ev.value;
    this.store.dispatch(loadFoodTypesByCategoryId({ categoryId:foodId }));
  }

  loadNutrients() {
    this.store.dispatch(loadNutrients());
  }

  test() {
    const formData = this.getFormData();
    console.log(formData);
    this.service.add(formData).subscribe();
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
    Object.keys(formModel).forEach((key:any) => {
      console.log(key);
      let valueToAppend = this.foodForm.get(key)?.value;
      formData.append(key,valueToAppend);
    })
    return formData;
  }
}
