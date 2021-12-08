import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Readings } from '../../enums/reading.category';
import { IApiResponse } from '../../interfaces/api.response';
import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';
import {
  ICreateReadingRes,
  IDeleteReading,
  ILatestCategoryReadings,
  IReading,
} from '../../interfaces/responses/readings/readings.res';
import { ReadingsApi } from '../api/readings.api';

@Injectable({
  providedIn: 'root',
})
export class ReadingsService {
  constructor(private api: ReadingsApi) {}

  listByMainCategory(
    category: Readings
  ): Observable<IApiResponse<IReading[]>> {
    return this.api.listByMainCategory(category);
    // .pipe(
    //   map((response) => {
    //     response.data.readingsSubCategories =
    //       response.data.readingsSubCategories.map((c) => {
    //         if (c.name.includes('начинаещи')) {
    //           return {
    //             ...c,
    //             name: 'За начинаещи',
    //           };
    //         } else if (c.name.includes('статии')) {
    //           return {
    //             ...c,
    //             name: 'Статии',
    //           };
    //         }
    //         return c;
    //       });
    //     return response;
    //   })
    // );
  }

  listBySubCategory(
    category: Readings,
    subcategory: string
  ): Observable<IApiResponse<IReading[]>> {
    return this.api.listBySubCategory(category, subcategory);
  }

  loadLatest(
    categories: Readings[]
  ): Observable<IApiResponse<ILatestCategoryReadings[]>> {
    return this.api.loadLatest(categories);
  }

  loadByIdInSubGroup(
    category: Readings,
    id: number,
    subCategory?: number
  ): Observable<IApiResponse<IReading>> {
    return this.api.loadByIdInSubGroup(category, id, subCategory);
  }

  loadBaseCategories() {
    return this.api.loadBaseCategories();
  }

  add(
    data: ICreateReadingRequest
  ): Observable<IApiResponse<ICreateReadingRes>> {
    return this.api.add(data);
  }

  update(data: any): Observable<any> {
    return this.api.update(data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReading>> {
    return this.api.delete(id);
  }
}
