import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAddFoodRes,
  IFoodCategoryRes,
} from '../../interfaces/responses/foods/foods.res';
import { FoodsApi } from '../api/foods.api';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  constructor(private api: FoodsApi) {}

  listCategories(): Observable<IFoodCategoryRes> {
    return this.api.listCategories();
  }

  add(data: any): Observable<IAddFoodRes> {
    return this.api.add(data);
  }

  getNutrients(): Observable<any> {
    return this.api.getNutrients();
  }
}
