import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  ReadingCategory,
  ReadingSubCategory,
} from '../../enums/reading.category';
import { IApiResponse } from '../../interfaces/api.response';
import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';
import {
  ICategoryReadingPreview,
  ICreateReadingRes,
  IDeleteReading,
  IMainCategory,
  IReading,
  ISubCategory,
} from '../../interfaces/responses/readings/readings.interface';
import { ReadingsApi } from '../api/readings.api';

@Injectable({
  providedIn: 'root',
})
export class ReadingsService {
  constructor(private api: ReadingsApi) {}

  listByMainCategory(
    category: ReadingCategory
  ): Observable<IApiResponse<ICategoryReadingPreview>> {
    return this.api
      .listByMainCategory(category)
      .pipe(filter((x) => x.data !== undefined));
  }

  listBySubCategory(
    category: ReadingCategory,
    subcategory: string
  ): Observable<IApiResponse<ICategoryReadingPreview>> {
    return this.api.listBySubCategory(category, subcategory);
  }

  loadCategoriesLatestPreviews(): Observable<
    IApiResponse<ICategoryReadingPreview[]>
  > {
    return this.api.loadCategoriesLatestPreviews();
  }

  loadOneByMainCategory(
    category: ReadingCategory | string,
    searchName: string
  ): Observable<IApiResponse<IReading>> {
    return this.api.loadOneByMainCategory(category, searchName);
  }

  loadOneByIdInSubGroup(
    category: ReadingCategory | string,
    subCategory: ReadingSubCategory | string,
    id: number
  ): Observable<IApiResponse<IReading>> {
    return this.api.loadOneByIdInSubCategory(category, subCategory, id);
  }

  loadMainCategories(): Observable<IApiResponse<IMainCategory[]>> {
    return this.api.loadMainCategories();
  }

  loadSubCategories(mainId: number): Observable<IApiResponse<ISubCategory[]>> {
    return this.api.loadSubCategories(mainId);
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
