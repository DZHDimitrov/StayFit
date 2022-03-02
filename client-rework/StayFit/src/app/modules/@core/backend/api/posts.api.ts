import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import {
  ICreatePostRes,
  IDeletePostRes,
  IPostMainCategoryRes,
  IPostPreviewRes,
  IPostRes,
  IUpdatePostRes,
} from '../../interfaces/forum/forum-post.interface';
import { HttpService } from './http.service';

@Injectable()
export class PostApi {
  private readonly apiController: string = 'forums/posts';
  constructor(private api: HttpService) {}

  listCategories(): Observable<IApiResponse<IPostMainCategoryRes>> {
    return this.api.get(`forums/categories`);
  }

  listPreviewsByCategory(
    subCategoryId: number,
    page?: number
  ): Observable<IApiResponse<IPostPreviewRes>> {
    return page
      ? this.api.get(`forums/viewforum/${subCategoryId}?page=${page}`)
      : this.api.get(`forums/viewforum/${subCategoryId}`);
  }

  listActive(): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.get(`${this.apiController}/active`);
  }

  listRecent(): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.get(`${this.apiController}/recent`);
  }

  listMine(): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.get(`${this.apiController}/my_posts`);
  }

  getById(postId: number): Observable<IApiResponse<IPostRes>> {
    return this.api.get(`${this.apiController}/${postId}`);
  }

  add(data: any): Observable<IApiResponse<ICreatePostRes>> {
    return this.api.post(`${this.apiController}`, data);
  }

  update(data: any): Observable<IApiResponse<IUpdatePostRes>> {
    return this.api.put(`${this.apiController}`, data);
  }

  delete(postId: number): Observable<IApiResponse<IDeletePostRes>> {
    return this.api.delete(`${this.apiController}/${postId}`);
  }
}
