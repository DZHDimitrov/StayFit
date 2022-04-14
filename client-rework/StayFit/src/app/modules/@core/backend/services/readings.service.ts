import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IReadingCategory } from 'src/app/modules/@pages/readings/models/readings-category.model';

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from 'src/app/modules/@pages/readings/models/readings-previews.model';

import { ICreateReadingRes, IDeleteReading, IReading } from 'src/app/modules/@pages/readings/models/readings-reading.model';

import { IApiResponse } from '../../interfaces/api.response';

import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';

import { ReadingsApi } from '../api/readings.api';


@Injectable({
  providedIn: 'root',
})
export class ReadingsService {
  constructor(private api: ReadingsApi) {}

  loadKnowledge(): Observable<IApiResponse<IKnowledge>> {
    return this.api.loadKnowledge();
  }

  loadMainCategoryWithPreviews(category: string): Observable<IApiResponse<IMainCategoryWithPreviews>> {
    return this.api.loadMainCategoryWithPreviews(category);
  }

  loadSubCategoryWithPreviews(category: string,subcategory: string): Observable<IApiResponse<ISubCategoryWithPreviews>> {
    return this.api.loadSubCategoryWithPreviews(category, subcategory);
  }

  loadReadingMainCategories():Observable<IApiResponse<IReadingCategory[]>> {
    return this.api.loadReadingMainCategories();
  }

  loadReadingSubCategories(mainId:number):Observable<IApiResponse<IReadingCategory[]>> {
    return this.api.loadReadingSubCategories(mainId);
  }

  loadReading(id:string):Observable<IApiResponse<IReading>> {
    return this.api.loadReading(id);
  }

  add(data: ICreateReadingRequest): Observable<IApiResponse<ICreateReadingRes>> {
    return this.api.add(data);
  }

  update(data: any): Observable<any> {
    return this.api.update(data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReading>> {
    return this.api.delete(id);
  }
}
