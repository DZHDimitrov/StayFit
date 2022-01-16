import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import {
  IAddFoodRes,
  IFood,
  IFoodCategory,
  IFoodPreview,
} from '../../interfaces/responses/foods/foods.res';
import { HttpService } from './http.service';

@Injectable()
export class FoodsApi {
  private readonly apiController = 'foods';

  constructor(private api: HttpService) {}

  listCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  listAutocompleteKeywords(
    searchedFood: string
  ): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.get(`${this.apiController}?food=${searchedFood}`);
  }

  listFoodsByCategory(
    category: string | number
  ): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  listFoodNamesByCategoryId(categoryId):Observable<any> {
    return this.api.get(`${this.apiController}/${categoryId}/food-types`)
  }

  loadFoodById(id: number): Observable<IApiResponse<IFood>> {
    return this.api.get(`${this.apiController}/id/${id}`);
  }

  search(text: string): Observable<IApiResponse<any>> {
    return this.api.get(`${this.apiController}/search?text=${text}`);
  }

  add(data: any): Observable<IAddFoodRes> {
    return this.api.post(`${this.apiController}`, data);
  }

  edit(foodId:number,data:any): Observable<any> {
    return this.api.put(`${this.apiController}/id/${foodId}`,data);
  }

  listNutrients(): Observable<any> {
    return this.api.get(`${this.apiController}/nutrients`);
  }
}
