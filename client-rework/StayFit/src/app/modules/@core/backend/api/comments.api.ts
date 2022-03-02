import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import {
    ICommentPreviewRes,
  ICommentsRes,
  ICreateCommentRes,
  IDeleteCommentRes,
} from '../../interfaces/forum/forum-comments.interface';
import { HttpService } from './http.service';

@Injectable()
export class CommentsApi {
  private readonly apiController: string = 'forums/comments';
  constructor(private api: HttpService) {}

  listByPostId(postId: number): Observable<IApiResponse<ICommentsRes>> {
    return this.api.get(`${this.apiController}/post?id=${postId}`);
  }

  listActive(): Observable<IApiResponse<ICommentPreviewRes>> {
    return this.api.get(`${this.apiController}/chosen`);
  }

  listRecent(): Observable<IApiResponse<ICommentPreviewRes>> {
    return this.api.get(`${this.apiController}/recent`);
  }

  listMine(): Observable<IApiResponse<ICommentPreviewRes>> {
    return this.api.get(`${this.apiController}/my_comments`);
  }

  add(data: any): Observable<IApiResponse<ICreateCommentRes>> {
    return this.api.post(`${this.apiController}`, data);
  }

  delete(commentId: string): Observable<IApiResponse<IDeleteCommentRes>> {
    return this.api.delete(`${this.apiController}/${commentId}`);
  }
}
