import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
import { HttpService } from './http.service';

@Injectable()
export class ReadingsApi {
  private readonly apiController: string = 'readings';
  constructor(private api: HttpService) {}

  loadCategoriesLatestPreviews(): Observable<
    IApiResponse<ICategoryReadingPreview[]>
  > {
    return this.api.get(`${this.apiController}/latest`);
  }

  listByMainCategory(
    category: ReadingCategory
  ): Observable<IApiResponse<ICategoryReadingPreview>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  listBySubCategory(
    category: ReadingCategory,
    subcategory: string
  ): Observable<IApiResponse<ICategoryReadingPreview>> {
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

  loadMainCategories(): Observable<IApiResponse<IMainCategory[]>> {
    return this.api.get(this.apiController);
  }

  loadSubCategories(mainId: number): Observable<IApiResponse<ISubCategory[]>>{
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
