import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IReadingCategory } from 'src/app/modules/@pages/readings/models/readings-category.model';

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from 'src/app/modules/@pages/readings/models/readings-previews.model';

import { ICreateReadingRequest, ICreateReadingResponse, IDeleteReadingResponse, IEditReadingRequest, IReading, IReadingForEdit } from 'src/app/modules/@pages/readings/models/readings-reading.model';

import { IApiResponse } from '../../interfaces/api.response';

import { HttpService } from './http.service';

@Injectable()
export class ReadingsApi {
  private readonly apiController: string = 'readings';
  
  constructor(private api: HttpService) {}

  loadKnowledge(): Observable<IApiResponse<IKnowledge>> {
    return this.api.get(`${this.apiController}/latest`);
  }

  loadReadingMainCategories(): Observable<IApiResponse<IReadingCategory[]>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  loadReadingSubCategories(mainId:number): Observable<IApiResponse<IReadingCategory[]>> {
    return this.api.get(`${this.apiController}/categories?mainId=${mainId}`);
  }

  loadMainCategoryWithPreviews(category: string): Observable<IApiResponse<IMainCategoryWithPreviews>> {
    return this.api.get(`${this.apiController}/categories/${category}`);
  }

  loadSubCategoryWithPreviews(category: string, subcategory: string): Observable<IApiResponse<ISubCategoryWithPreviews>> {
    return this.api.get(`${this.apiController}/categories/${category}/${subcategory}`);
  }

  loadReading(id:string):Observable<IApiResponse<IReading>> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  loadReadingForEdit(id:string):Observable<IApiResponse<IReadingForEdit>> {
    return this.api.get(`${this.apiController}/${id}/edit`)
  }

  add(data: ICreateReadingRequest): Observable<IApiResponse<ICreateReadingResponse>> {
    return this.api.post(this.apiController, data);
  }

  edit(readingId:number,data: IEditReadingRequest): Observable<IApiResponse<IReading>> {
    return this.api.put(`${this.apiController}/${readingId}/edit`, data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReadingResponse>> {
    return this.api.delete(`${this.apiController}/${id}`);
  }
}
