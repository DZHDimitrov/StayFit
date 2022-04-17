import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IFoodCategory } from 'src/app/modules/@pages/foods/models/foods-category.model';

import {
  IFood,
  IFoodPreview,
} from 'src/app/modules/@pages/foods/models/foods-food.model';

import {
  IAddFoodRequest,
  IEditFoodRequest,
} from 'src/app/modules/@pages/foods/models/foods-request';

import { IFoodType } from 'src/app/modules/@pages/foods/models/foods-types.model';

import { IApiResponse } from '../../interfaces/api.response';

import { HttpService } from './http.service';

@Injectable()
export class FoodsApi {
  private readonly apiController = 'foods';

  constructor(private api: HttpService) {}

  loadCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  loadFoodsByCategory(
    category: string | number
  ): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.get(`${this.apiController}/${category}/previews`);
  }

  loadFoodTypesByCategoryId(categoryId): Observable<IApiResponse<IFoodType[]>> {
    return this.api.get(`${this.apiController}/${categoryId}/types`);
  }

  loadFoodById(id: number): Observable<IApiResponse<IFood>> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  search(text: string): Observable<IApiResponse<IFoodPreview>> {
    return this.api.get(`${this.apiController}/search?text=${text}`);
  }

  add(data: IAddFoodRequest): Observable<IApiResponse<string>> {
    return this.api.post(`${this.apiController}`, data);
  }

  edit(
    foodId: number,
    data: IEditFoodRequest
  ): Observable<IApiResponse<{ id: number; food: IFood }>> {
    return this.api.put(`${this.apiController}/${foodId}`, data);
  }

  delete(foodId: number): Observable<IApiResponse<string>> {
    return this.api.delete(`${this.apiController}/${foodId}`);
  }
}
