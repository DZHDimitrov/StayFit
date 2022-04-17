import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IFoodCategory } from 'src/app/modules/@pages/foods/models/foods-category.model';

import { IFood, IFoodPreview } from 'src/app/modules/@pages/foods/models/foods-food.model';
import { IAddFoodRequest } from 'src/app/modules/@pages/foods/models/foods-request';

import { IFoodType } from 'src/app/modules/@pages/foods/models/foods-types.model';

import { IApiResponse } from '../../interfaces/api.response';

import { FoodsApi } from '../api/foods.api';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  constructor(private api: FoodsApi) {}

  loadCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.loadCategories();
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

  add(data: IAddFoodRequest): Observable<IApiResponse<string>> {
    return this.api.add(data);
  }

  edit(foodId: number, data: any): Observable<IApiResponse<{id:number,food:IFood}>> {
    return this.api.edit(foodId, data);
  }

  delete(foodId):Observable<IApiResponse<string>> {
    return this.api.delete(foodId);
  }

  loadFoodTypesByCategoryId(categoryId): Observable<IApiResponse<IFoodType[]>> {
    return this.api.loadFoodTypesByCategoryId(categoryId);
  }
}
