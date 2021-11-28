import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  IFoodCategory,
  IFoodType,
  INutrient,
  INutrientType,
} from 'src/app/modules/core/interfaces/food';
import { NutritionsService } from 'src/app/modules/core/services/api/nutritions/nutritions.service';
import { getNutrients } from './misc/nutrient';
import { NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-create-new-food',
  templateUrl: './create-new-food.component.html',
  styleUrls: ['./create-new-food.component.scss'],
})
export class CreateNewFoodComponent implements OnInit {
  newFoodForm!: FormGroup;
  foodCategories!: IFoodCategory[];
  foodTypes: IFoodType[] = [];
  subject$: Subject<any> = new Subject<any>();
  nutrients: INutrient[] = [];
  isLoading!: boolean;

  foodTypeIsSelected:boolean = false;

  constructor(
    private fb: FormBuilder,
    private nutritionsService: NutritionsService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.nutritionsService
      .getFoodCategories()
      .subscribe((foodCategories) => (this.foodCategories = foodCategories));

    this.nutritionsService.getFoodNutrients().subscribe((nutrients) => {
      this.nutrients = nutrients;
      console.log(this.nutrients)
    });

    this.subject$
      .pipe(
        switchMap((categoryId) =>
          this.nutritionsService.getFoodTypesByCategory(categoryId)
        )
      )
      .subscribe((foodTypes) => {
        this.foodTypes = foodTypes;
        this.isLoading = false;
      });
    this.newFoodForm = this.fb.group({
      foodCategoryId: [''],
      foodTypeId: [''],
      calories: [''],
      imageUrl: [''],
      description: [''],
      Carbohydrates: this.fb.group(getNutrients('carbohydrates')),
      Aminoacids: this.fb.group(getNutrients('aminoacids')),
      Vitamins: this.fb.group(getNutrients('vitamins')),
      Sterols: this.fb.group(getNutrients('sterols')),
      Minerals: this.fb.group(getNutrients('minerals')),
      Fats: this.fb.group(getNutrients('fats')),
      More: this.fb.group(getNutrients('more'))
    });
  }

  updateFoodTypes(ev: any) {
    this.subject$.next(ev);
  }

  onSubmit() {
    this.isLoading = true;
    const data = Object.keys(this.newFoodForm.value).reduce((acc:any,el) =>{
      if (typeof this.newFoodForm.value[el] == 'object') {
        acc[el] = Object.entries(this.newFoodForm.value[el]).reduce((currAcc:INutrientType[],currEl) => {
          currEl[0] = currEl[0] == 'Mores' ? "More" : currEl[0];
          const nutrient: INutrientType = {
            name: currEl[0],
            quantity: currEl[1] != null ? parseInt(currEl[1] as string) : null,
          }
          currAcc.push(nutrient)
          return currAcc
        },[])
      } else {
        acc[el] = this.newFoodForm.value[el];
      }
      return acc
    },{});
    this.nutritionsService.postNewFood(data).subscribe(x=> {
      this.toastrService.show('Успешно добавихте нов запис на храна!','Добавяне на храна',{status:"success",duration:3500,destroyByClick:true})
      this.newFoodForm.reset();
      this.isLoading = false;
    });
  }
}
