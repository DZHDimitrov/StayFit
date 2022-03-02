import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';

import { ReadingsApi } from '../api/readings.api';

import {IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from '../../interfaces/readings/readings-previews.interface';

import { ICreateReadingRes, IDeleteReading, IReading } from '../../interfaces/readings/readings-reading.interface';

import { IReadingCategory } from '../../interfaces/readings/readings-category.interface';

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

  loadReading(category:string,subCategory?:string,id?:string):Observable<IApiResponse<IReading>> {
    return this.api.loadReading(category,subCategory,id);
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
