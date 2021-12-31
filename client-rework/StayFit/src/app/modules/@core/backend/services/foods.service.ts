import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import {
  IAddFoodRes,
  IFoodPreview,
  IFoodCategory,
  IFood,
} from '../../interfaces/responses/foods/foods.res';
import { FoodsApi } from '../api/foods.api';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  constructor(private api: FoodsApi) {}

  listCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.listCategories();
  }

  listSearchedFood(
    searchedFood: string
  ): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.listSearchedFood(searchedFood);
  }

  listFoodsByCategory(category: string): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.listFoodsByCategory(category);
  }

  loadFoodById(id: number): Observable<IApiResponse<IFood>> {
    return this.api.loadFoodById(id);
  }

  add(data: any): Observable<IAddFoodRes> {
    return this.api.add(data);
  }

  getNutrients(): Observable<any> {
    return this.api.getNutrients();
  }
}
