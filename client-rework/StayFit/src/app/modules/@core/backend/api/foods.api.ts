import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import {
  IAddFoodRes,
  IFoodCategory,
  ISearchedFood,
} from '../../interfaces/responses/foods/foods.res';
import { HttpService } from './http.service';

@Injectable()
export class FoodsApi {
  private readonly apiController = 'foods';

  constructor(private api: HttpService) {}

  listCategories(): Observable<IApiResponse<IFoodCategory[]>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  listSearchedFood(
    searchedFood: string
  ): Observable<IApiResponse<ISearchedFood[]>> {
    return this.api.get(`${this.apiController}?food=${searchedFood}`);
  }

  listFoodByCategory(category: string): Observable<any> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  loadFoodById(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/id/${id}`);
  }

  add(data: any): Observable<IAddFoodRes> {
    return this.api.post(`${this.apiController}`, data);
  }

  getNutrients(): Observable<any> {
    return this.api.get(`${this.apiController}/nutrients`);
  }
}
