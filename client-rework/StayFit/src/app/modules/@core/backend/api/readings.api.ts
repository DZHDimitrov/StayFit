import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Readings } from '../../enums/reading.category';
import { IApiResponse } from '../../interfaces/api.response';
import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';
import {
  ICreateReadingRes,
  IDeleteReading,
  ILatestCategoryReadings,
  IReading,
} from '../../interfaces/responses/readings/readings.res';
import { HttpService } from './http.service';

@Injectable()
export class ReadingsApi {
  private readonly apiController: string = 'readings';
  constructor(private api: HttpService) {}

  listByMainCategory(
    category: Readings
  ): Observable<IApiResponse<IReading[]>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  listBySubCategory(
    category: Readings,
    subcategory: string
  ): Observable<IApiResponse<IReading[]>> {
    return this.api.get(`${this.apiController}/${category}/${subcategory}`);
  }

  loadLatest(categories: Readings[]): Observable<IApiResponse<ILatestCategoryReadings[]>> {
    return this.api.post(`${this.apiController}/latest`, categories);
  }

  loadByIdInSubGroup(
    category: Readings,
    id: number,
    subCategory?: number
  ): Observable<IApiResponse<IReading>> {
    return this.api.get(
      `${this.apiController}/${category}/single/${id}?subcategory=${subCategory}`
    );
  }

  loadBaseCategories(): Observable<IApiResponse<any>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  add(
    data: ICreateReadingRequest
  ): Observable<IApiResponse<ICreateReadingRes>> {
    return this.api.post(this.apiController, data);
  }

  update(data: any): Observable<any> {
    return this.api.put(this.apiController, data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReading>> {
    return this.api.delete(`${this.apiController}/${id}`);
  }
}
