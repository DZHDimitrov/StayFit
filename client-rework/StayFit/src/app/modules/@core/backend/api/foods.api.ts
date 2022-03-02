import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { IAddFood, IEditFood } from '../../interfaces/requests/foods.req';

import { IFoodCategory } from '../../interfaces/foods/foods-category.interface';

import { IFood, IFoodPreview } from '../../interfaces/foods/foods-food.interface';

import { IFoodKeyword } from '../../interfaces/foods/foods-keywords.interface';

import { IFoodType } from '../../interfaces/foods/foods-types.interface';

import { HttpService } from './http.service';

@Injectable()
export class FoodsApi {
  private readonly apiController = 'foods';

  constructor(private api: HttpService) {}

  loadCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  loadAutocompleteKeywords(searchedFood: string): Observable<IApiResponse<IFoodKeyword[]>> {
    return this.api.get(`${this.apiController}/search/keywords?food=${searchedFood}`);
  }

  loadFoodsByCategory(category: string | number): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  loadFoodTypesByCategoryId(categoryId): Observable<IApiResponse<IFoodType[]>> {
    return this.api.get(`${this.apiController}/${categoryId}/types`);
  }

  loadFoodById(id: number): Observable<IApiResponse<IFood>> {
    return this.api.get(`${this.apiController}/id/${id}`);
  }

  search(text: string): Observable<IApiResponse<IFoodPreview>> {
    return this.api.get(`${this.apiController}/search?text=${text}`);
  }

  add(data: IAddFood): Observable<void> {
    return this.api.post(`${this.apiController}`, data);
  }

  edit(foodId: number, data: IEditFood): Observable<any> {
    return this.api.put(`${this.apiController}/id/${foodId}`, data);
  }
}
