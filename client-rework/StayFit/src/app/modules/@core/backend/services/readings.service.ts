import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IReadingCategory } from 'src/app/modules/@pages/readings/models/readings-category.model';

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from 'src/app/modules/@pages/readings/models/readings-previews.model';

import { ICreateReadingRequest, ICreateReadingResponse, IDeleteReadingResponse, IEditReadingRequest, IReading, IReadingForEdit } from 'src/app/modules/@pages/readings/models/readings-reading.model';

import { IApiResponse } from '../../interfaces/api.response';

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

  loadReadingForEdit(id:string):Observable<IApiResponse<IReadingForEdit>> {
    return this.api.loadReadingForEdit(id);
  }

  add(data: ICreateReadingRequest): Observable<IApiResponse<ICreateReadingResponse>> {
    return this.api.add(data);
  }

  edit(readingId:number,data: IEditReadingRequest): Observable<IApiResponse<IReading>> {
    return this.api.edit(readingId,data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReadingResponse>> {
    return this.api.delete(id);
  }
}
