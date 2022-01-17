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
  IReading,
} from '../../interfaces/responses/readings/readings.interface';
import { HttpService } from './http.service';

@Injectable()
export class ReadingsApi {
  private readonly apiController: string = 'readings';
  constructor(private api: HttpService) {}

  loadCategories(mainId?: number): Observable<IApiResponse<any>> {
    const route = mainId ? `?mainId=${mainId}` : '';
    return this.api.get(`${this.apiController}/categories${route}`);
  }

  loadPreviewsByMainCategory(
    category: ReadingCategory
  ): Observable<IApiResponse<ICategoryReadingPreview>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  loadPreviewsBySubCategory(
    category: ReadingCategory,
    subcategory: string
  ): Observable<IApiResponse<ICategoryReadingPreview>> {
    return this.api.get(`${this.apiController}/${category}/${subcategory}`);
  }

  loadCategoriesLatestPreviews(): Observable<
    IApiResponse<ICategoryReadingPreview[]>
  > {
    return this.api.get(`${this.apiController}/latest`);
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
