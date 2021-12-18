import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ReadingCategory,
  ReadingSubCategory,
} from '../../enums/reading.category';
import { IApiResponse } from '../../interfaces/api.response';
import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';
import {
  ICategoryReadingPreviews,
  ICreateReadingRes,
  IDeleteReading,
  IReading,
} from '../../interfaces/responses/readings/readings.res';
import { HttpService } from './http.service';

@Injectable()
export class ReadingsApi {
  private readonly apiController: string = 'readings';
  constructor(private api: HttpService) {}

  loadCategoriesLatestPreviews(): Observable<
    IApiResponse<ICategoryReadingPreviews[]>
  > {
    return this.api.get(`${this.apiController}/latest`);
  }

  listByMainCategory(
    category: ReadingCategory
  ): Observable<IApiResponse<ICategoryReadingPreviews>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  listBySubCategory(
    category: ReadingCategory,
    subcategory: string
  ): Observable<IApiResponse<ICategoryReadingPreviews>> {
    return this.api.get(`${this.apiController}/${category}/${subcategory}`);
  }

  loadOneByMainCategory(
    category: ReadingCategory | string,
    searchName: string
  ) {
    return this.api.get(
      `${this.apiController}/single/${category}/${searchName}`
    );
  }

  loadOneByIdInSubCategory(
    category: ReadingCategory | string,
    subCategory: ReadingSubCategory | string,
    id: number
  ): Observable<IApiResponse<IReading>> {
    return this.api.get(
      `${this.apiController}/single/${category}/${subCategory}/${id}`
    );
  }

  loadMainCategories(): Observable<any> {
    return this.api.get(this.apiController);
  }

  loadSubCategories(mainId: number): Observable<any> {
    debugger;
    return this.api.get(`${this.apiController}/subcategories?mainId=${mainId}`);
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
