import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMethod } from '../../conts';
import { HttpService } from '../../http/http.service';
import { IFoodCategory, IFoodType, INewFoodPost, INutrient } from '../../../interfaces/food';

@Injectable({
  providedIn: 'root'
})
export class NutritionsService {

  constructor(private http: HttpService) { }

  getFoodCategories(): Observable<IFoodCategory[]> {
    return this.http.requestCall('/nutritions/categories',ApiMethod.GET);
  }

  getFoodTypesByCategory(categoryId: number): Observable<IFoodType[]> {
    return this.http.requestCall(`/administration/new-food/${categoryId}`,ApiMethod.GET);
  }

  getFoodNutrients(): Observable<INutrient[]> {
    return this.http.requestCall('/nutritions/nutrients',ApiMethod.GET);
  }

  postNewFood(data:any): Observable<INewFoodPost> {
    const b: INewFoodPost = {
      aminoacids: data.Aminoacids,
      calories: data.calories,
      carbohydrates: data.Carbohydrates,
      description: data.description,
      fats: data.Fats,
      foodCategoryId: data.foodCategoryId,
      foodTypeId: data.foodTypeId,
      imageurl: data.imageUrl,
      minerals: data.Minerals,
      mores: data.More,
      sterols: data.Sterols,
      vitamins: data.Vitamins,
    }
    return this.http.requestCall('/nutritions',ApiMethod.POST,JSON.stringify(b));
  }
}
