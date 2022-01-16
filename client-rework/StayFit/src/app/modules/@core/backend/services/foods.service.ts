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

  listAutocompleteKeywords(
    searchedFood: string
  ): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.listAutocompleteKeywords(searchedFood);
  }

  listFoodsByCategory(category: string | number): Observable<IApiResponse<IFoodPreview[]>> {
    return this.api.listFoodsByCategory(category);
  }

  loadFoodById(id: number): Observable<IApiResponse<IFood>> {
    return this.api.loadFoodById(id);
  }

  search(text:string):Observable<IApiResponse<any>> {
    return this.api.search(text);
  }

  add(data: any): Observable<IAddFoodRes> {
    return this.api.add(data);
  }

  edit(foodId:number,data:any): Observable<any> {
    return this.api.edit(foodId,data);
  }

  listNutrients(): Observable<any> {
    return this.api.listNutrients();
  }

  listFoodNamesByCategoryId(categoryId):Observable<any> {
    return this.api.listFoodNamesByCategoryId(categoryId);
  }
}
