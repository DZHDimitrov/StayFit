import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { IAddFood } from '../../interfaces/requests/foods.req';

import { IFoodCategory } from '../../interfaces/foods/foods-category.interface';

import { IFood, IFoodPreview } from '../../interfaces/foods/foods-food.interface';

import { IFoodKeyword } from '../../interfaces/foods/foods-keywords.interface';

import { IFoodType } from '../../interfaces/foods/foods-types.interface';

import { FoodsApi } from '../api/foods.api';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  constructor(private api: FoodsApi) {}

  loadCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.loadCategories();
  }

  loadAutocompleteKeywords(searchedFood: string): Observable<IApiResponse<IFoodKeyword[]>> {
    return this.api.loadAutocompleteKeywords(searchedFood);
  }

  loadFoodsByCategory(category: string | number): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.loadFoodsByCategory(category);
  }

  loadFoodById(id: number): Observable<IApiResponse<IFood>> {
    return this.api.loadFoodById(id);
  }

  search(text: string): Observable<IApiResponse<IFoodPreview>> {
    return this.api.search(text);
  }

  add(data: IAddFood): Observable<void> {
    return this.api.add(data);
  }

  edit(foodId: number, data: any): Observable<IApiResponse<{id:number,food:IFood}>> {
    return this.api.edit(foodId, data);
  }

  loadFoodTypesByCategoryId(categoryId): Observable<IApiResponse<IFoodType[]>> {
    return this.api.loadFoodTypesByCategoryId(categoryId);
  }
}
